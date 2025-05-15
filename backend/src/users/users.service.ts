import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { RegisterData } from './dto/register-data.dto';
import * as bcrypt from 'bcrypt';
import { LoginData } from './dto/login-data.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { getActivationEmailTemplate } from './templates/activation-email.template';
import { UserInvite } from './entities/user-invite.entity';
import { InviteStatus } from 'src/enums/invite-status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserInvite)
    private readonly userInviteRepository: Repository<UserInvite>,
    private readonly mailerService: MailerService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async sendActivationEmail(email: string): Promise<void> {
    const activationLink = `http://localhost:4200/activate-account/${email}`;
    const emailTemplate = getActivationEmailTemplate(activationLink);

    const message = {
      to: email,
      from: `"Administracja serwisu" <mailtestowy1221@op.pl>`,
      subject: 'Potwierdzenie utworzenia konta',
      html: emailTemplate,
    };

    await this.mailerService.sendMail(message);
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async registerUser(registerData: RegisterData): Promise<User> {
    if (registerData.password !== registerData.repeatedPassword) {
      throw new BadRequestException('passwords-do-not-match');
    }

    const exisitngUser = await this.userRepository.findOne({
      where: [{ email: registerData.email }, { login: registerData.login }],
    });

    if (exisitngUser) {
      throw new BadRequestException('user-already-exists');
    }

    const hashedPassword = await this.hashPassword(registerData.password);

    const user = new User();
    user.email = registerData.email;
    user.login = registerData.login;
    user.password = hashedPassword;
    user.isActive = false;

    await this.sendActivationEmail(registerData.email);

    return this.userRepository.save(user);
  }

  async loginUser(loginData: LoginData) {
    const user = await this.userRepository.findOne({
      where: { email: loginData.email, isActive: true },
    });

    if (!user) {
      throw new BadRequestException('invalid-user-data');
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('invalid-user-data');
    }

    return user;
  }

  async activateAccount(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('user-not-found');
    }

    user.isActive = true;
    return this.userRepository.save(user);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUserStatus(userId: number, isOnline: boolean): Promise<void> {
    await this.userRepository.update({ id: userId }, { isOnline });
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: [
        'posts',
        'comments',
        'friends',
        'likedPosts',
        'sentInvites',
        'receivedInvites',
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async searchUsers(search: string): Promise<User[]> {
    return this.userRepository.find({
      where: [
        { email: ILike(`%${search}%`) },
        { firstName: ILike(`%${search}%`) },
        { lastName: ILike(`%${search}%`) },
        { login: ILike(`%${search}%`) },
      ],
    });
  }

  async sendFriendRequest(
    senderId: number,
    receiverId: number,
  ): Promise<UserInvite> {
    const sender = await this.findOneById(senderId);
    const receiver = await this.findOneById(receiverId);

    if (!sender || !receiver) {
      throw new NotFoundException('User not found');
    }

    const existingInvite = await this.userInviteRepository.findOne({
      where: { sender: { id: senderId }, receiver: { id: receiverId } },
    });

    if (existingInvite) {
      throw new BadRequestException('Friend request already sent');
    }

    const invite = new UserInvite();
    invite.sender = sender;
    invite.receiver = receiver;

    return await this.userInviteRepository.save(invite);
  }

  async respondToFriendRequest(
    receiverId: number,
    senderId: number,
    accept: boolean,
  ): Promise<void> {
    const invite = await this.userInviteRepository.findOne({
      where: { sender: { id: senderId }, receiver: { id: receiverId } },
      relations: ['sender', 'receiver'],
    });

    if (!invite) {
      throw new BadRequestException('Friend request not found');
    }

    if (accept) {
      const sender = invite.sender;
      const receiver = invite.receiver;

      sender.friends.push(receiver);
      receiver.friends.push(sender);

      await this.userRepository.save(sender);
      await this.userRepository.save(receiver);
    }

    invite.status = accept ? InviteStatus.ACCEPTED : InviteStatus.REJECTED;

    await this.userInviteRepository.save(invite);
  }

  // async likePost(userId: number, postId: string): Promise<void> {
  //   const user = await this.findOneById(userId);

  //   if (user.likedPost.includes(postId)) {
  //     throw new BadRequestException('Post already liked');
  //   }

  //   user.likedPost.push(postId);
  //   await this.userRepository.save(user);
  // }
}
