import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInvite } from './entities/user-invite.entity';
import { InviteStatus } from 'src/enums/invite-status.enum';

@Injectable()
export class UserInvitesService {
  constructor(
    @InjectRepository(UserInvite)
    private readonly userInviteRepository: Repository<UserInvite>,
  ) {}

  async getAllPendingInvitesForUser(userId: number): Promise<UserInvite[]> {
    return this.userInviteRepository.find({
      where: [
        { sender: { id: userId }, status: InviteStatus.PENDING },
        { receiver: { id: userId }, status: InviteStatus.PENDING },
      ],
      relations: ['sender', 'receiver'],
    });
  }

  async getPendingInvitesForReceiver(userId: number): Promise<UserInvite[]> {
    return this.userInviteRepository.find({
      where: { receiver: { id: userId }, status: InviteStatus.PENDING },
      relations: ['sender', 'receiver'],
    });
  }

  async getPendingInvitesForSender(userId: number): Promise<UserInvite[]> {
    return this.userInviteRepository.find({
      where: { sender: { id: userId }, status: InviteStatus.PENDING },
      relations: ['sender', 'receiver'],
    });
  }
}
