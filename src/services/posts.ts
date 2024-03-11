import api from "./baseURL";

interface IPostProps {
  title: string;
  text: string;
}

export const getAllPostsService = async () => {
  const authKey = sessionStorage.getItem("auth");
  return api
    .get("/posts", {
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

export const deletePostService = async (deletedId: number) => {
  const authKey = sessionStorage.getItem("auth");
  return api
    .delete(`/posts/${deletedId}`, {
      headers: {
        Authorization: `Bearer ${authKey ? JSON.parse(authKey) : ""}`,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const createPostService = async (postForm: IPostProps) => {
  const authKey = sessionStorage.getItem("auth");
  return api
    .post("/posts", postForm, {
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

export const editPostService = async (postForm: IPostProps, postId: number) => {
    const authKey = sessionStorage.getItem("auth");
    return api
      .patch(`/posts/${postId}`, postForm, {
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