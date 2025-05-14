import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { RegisterData } from './dto/register-data.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async getAllUsers(@Res() response: Response) {
    const res = await this.usersService.getAllUsers();

    response.status(HttpStatus.OK).send({
      message: 'get-all-users',
      data: res,
    });
  }

  @Post('register')
  async registerUser(
    @Body() registerData: RegisterData,
    @Res() response: Response,
  ) {
    try {
      const user = await this.usersService.registerUser(registerData);
      response.status(HttpStatus.CREATED).send({
        message: 'user-registered',
        data: user,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        response.status(HttpStatus.BAD_REQUEST).send({
          message: error.message,
        });
      } else {
        response.send(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: 'internal-server-error',
        });
      }
    }
  }

  @Patch('activate-account')
  async activateAccount(
    @Query('userEmail') userEmail: string,
    @Res() response: Response,
  ) {
    try {
      await this.usersService.activateAccount(userEmail);
      response.status(HttpStatus.OK).send({
        message: 'your-account-has-been-successfully-activated',
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        response.status(HttpStatus.BAD_REQUEST).send({
          message: error.message,
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: 'a-server-error-occurred',
        });
      }
    }
  }

  @Get('by-email')
  async getUserByEmail(
    @Query('userEmail') userEmail: string,
    @Res() response: Response,
  ) {
    try {
      const user = await this.usersService.findOneByEmail(userEmail);
      response.status(HttpStatus.OK).send({
        message: 'user-found',
        data: user,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        response.status(HttpStatus.NOT_FOUND).send({
          message: error.message,
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: 'a-server-error-occurred',
        });
      }
    }
  }

  @Post(':id/send-friend-request/:receiverId')
  async sendFriendRequest(
    @Param('id', ParseIntPipe) senderId: number,
    @Param('receiverId', ParseIntPipe) receiverId: number,
    @Res() response: Response,
  ) {
    try {
      // await this.usersService.sendFriendRequest(senderId, receiverId);

      response.status(HttpStatus.OK).send({
        message: 'friend-request-sent',
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        response.status(HttpStatus.BAD_REQUEST).send({
          message: error.message,
        });
      } else if (error instanceof NotFoundException) {
        response.status(HttpStatus.NOT_FOUND).send({
          message: error.message,
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: 'a-server-error-occurred',
        });
      }
    }
  }

  @Post(':id/accept-friend-request/:senderId')
  async acceptFriendRequest(
    @Param('id', ParseIntPipe) userId: number,
    @Param('senderId', ParseIntPipe) senderId: number,
    @Body('accept') accept: boolean,
    @Res() response: Response,
  ): Promise<void> {
    try {
      // await this.usersService.acceptFriendRequest(userId, senderId, accept);

      response.status(HttpStatus.OK).send({
        message: accept ? 'friend-request-accepted' : 'friend-request-declined',
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        response.status(HttpStatus.BAD_REQUEST).send({
          message: error.message,
        });
      } else if (error instanceof NotFoundException) {
        response.status(HttpStatus.NOT_FOUND).send({
          message: error.message,
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: 'a-server-error-occurred',
        });
      }
    }
  }
}
