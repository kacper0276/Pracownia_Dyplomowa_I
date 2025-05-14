import { User } from './user.model';

export interface Post {
  id: number;
  name: string;
  description: string;
  image?: string;
  likes: number;
  userId: number;
  comments: string[];
  likedBy: User[];
}
