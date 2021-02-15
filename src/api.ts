import axios, { AxiosResponse, AxiosError } from "axios";

export const createAPI = () => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response: AxiosResponse) => {
    return response;
  };

  const onFail = (err: AxiosError) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
