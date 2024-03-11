import api from "./baseURL";

interface IUserProps {
  email: string;
  name: string;
  password: string;
}

export const postCreateUserService = async (userForm: IUserProps) => {
  return api
    .post("/users", userForm)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const getAllUsersService = async () => {
  const authKey = sessionStorage.getItem("auth");
  return api
    .get("/users", {
      headers: {
        Authorization: "Bearer " + `${authKey ? JSON.parse(authKey) : ""}`,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.warn(error);
    });
};
