import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterData } from './dto/register-data.dto';
import { LoginData } from './dto/login-data.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { getActivationEmailTemplate } from './templates/activation-email.template';
import { UserInvite } from './entities/user-invite.entity';
import { InviteStatus } from 'src/enums/invite-status.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { EditBio } from './dto/edit-bio.dto';

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
    const activationLink = `http://localhost:4200/auth/activate-account/${email}`;
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
    user.firstName = registerData?.firstName ?? '';
    user.lastName = registerData?.lastName ?? '';
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

  async getUserFriends(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });
    return user?.friends ?? [];
  }

  async updateUserStatus(userId: number, isOnline: boolean): Promise<void> {
    await this.userRepository.update({ id: userId }, { isOnline });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!dto.password) {
      delete dto.password;
    } else {
      dto.password = await this.hashPassword(dto.password);
    }

    Object.assign(user, dto);
    return await this.userRepository.save(user);
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
        'sentInvites.sender',
        'sentInvites.receiver',
        'receivedInvites.sender',
        'receivedInvites.receiver',
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
      relations: ['sender', 'sender.friends', 'receiver', 'receiver.friends'],
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

  async editBio(data: EditBio) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('Not found user');
    }

    user.bio = data.bio;

    await this.userRepository.save(user);
  }
}
