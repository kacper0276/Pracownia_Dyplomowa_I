import { User } from './user.model';

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}
