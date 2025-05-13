import { Entity, ManyToOne, Column } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { User } from './user.entity';
import { InviteStatus } from '../../enums/invite-status.enum';

@Entity('user_invites')
export class UserInvite extends BaseEntity {
  @ManyToOne(() => User, (user) => user.receivedInvites, {
    onDelete: 'CASCADE',
  })
  recipient: User;

  @ManyToOne(() => User, (user) => user.sentInvites, { onDelete: 'CASCADE' })
  sender: User;

  @Column({
    type: 'enum',
    enum: InviteStatus,
    default: InviteStatus.PENDING,
  })
  status: InviteStatus;

  @Column({ nullable: true })
  message?: string;
}
