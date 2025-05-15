import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from 'src/config/mailer.config';
import { UserStatusGateway } from './users.gateway';
import { UserInvite } from './entities/user-invite.entity';
import { UserInvitesService } from './user-invites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserInvite]),
    MailerModule.forRoot(mailerConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserInvitesService, UserStatusGateway],
  exports: [UsersService],
})
export class UsersModule {}
