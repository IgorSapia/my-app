import api from "./baseURL";

interface ILoginProps {
  email: string;
  password: string;
}

export const postLoginService = async (loginForm: ILoginProps) => {
  return api
    .post("/auth/login", loginForm)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.warn(error);
    });
};
