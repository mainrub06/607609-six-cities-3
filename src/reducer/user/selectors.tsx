import { getUserData } from "../../utils";

export const getAuthStatus = (state: any): string =>
  state.user.authorizationStatus;
export const getUserInfo = (state: any): any =>
  getUserData(state.user.userInfo);
