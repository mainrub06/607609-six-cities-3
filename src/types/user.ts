export interface IUserInfo {
  id: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  isPro: boolean;
}

export interface IUser {
  authorizationStatus: string;
  userInfo: IUserInfo;
}
