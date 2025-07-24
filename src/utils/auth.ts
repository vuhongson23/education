export const isAuthenticated = () => {
  const userInfor = localStorage.getItem("user_infor");
  const user = userInfor ? JSON.parse(userInfor) : null;
  return user;
};
