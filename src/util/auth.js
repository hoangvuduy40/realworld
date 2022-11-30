export const checkToken = () => {
  const access = localStorage.getItem("user");
  if (access) {
    return true;
  }
  return false;
};

export const getUser = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  if (user) {
    return user;
  }
  return {};
};
