import { extend } from "../../utils";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: null,
};

const ActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
};

const ActionCreator = {
  setAuthorizationStatus: (value) => ({
    type: ActionType.SET_AUTHORIZATION_STATUS,
    payload: value,
  }),
};

const Operation = {
  getAuthorizationStatus: () => (dispatch, getState, api) => {
    return api
      .get(`/login`)
      .then((response) => {
        dispatch(
          ActionCreator.setAuthorizationStatus({
            authorizationStatus: AuthorizationStatus.AUTH,
            userInfo: response.data,
          })
        );
      })
      .catch((err) => err);
  },
  setAuthorizationStatus: (authData) => (dispatch, getState, api) => {
    return api
      .post(`/login`, {
        email: authData.email,
        password: authData.password,
      })
      .then((response) => {
        dispatch(
          ActionCreator.setAuthorizationStatus({
            authorizationStatus: AuthorizationStatus.AUTH,
            userInfo: response.data,
          })
        );
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return extend(state, action.payload);
  }
  return state;
};

export { reducer, Operation, ActionType, ActionCreator };
