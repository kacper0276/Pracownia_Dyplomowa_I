export interface User {
  id: number;
  email: string;
  login: string;
  profileImage?: string;
  backgroundImage?: string;
  isActive: boolean;
  isOnline: boolean;
  likedPost: string[];
  friendsId: string[];
  invitedFriends: string[];
  invitedSended: string[];
}
