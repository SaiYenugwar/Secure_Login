import { environment } from './environment';

export const URL = {
  API_BASE_URL: `${environment.apiUrl}`,
};

export const CONFIG = {
  AUTH: {
    LOGIN: `${URL.API_BASE_URL}/user/login`,
    REGISTER: `${URL.API_BASE_URL}/user/register`,
  },
  USER: {
    UPDATE: `${URL.API_BASE_URL}/user/update-password`,
    DELETE: `${URL.API_BASE_URL}/user/delete`,
  }
};
