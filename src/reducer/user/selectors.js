import { getUserData } from "../../utils";

export const getAuthStatus = (state) => state.user.authorizationStatus;
export const getUserInfo = (state) => getUserData(state.user.userInfo);
