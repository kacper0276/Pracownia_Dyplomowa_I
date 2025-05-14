export interface User {
  id: number;
  email: string;
  login: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  backgroundImage?: string;
  isActive: boolean;
  isOnline: boolean;
  likedPosts: string[];
  friends: User[];
  sentInvites: string[];
  receivedInvites: string[];
  posts: string[];
}
