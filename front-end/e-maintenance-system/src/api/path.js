export const root = process.env.REACT_APP_URL_API;

const path = {
  auth: {
    login: "/authenticate/token",
    logout: "/authenticate/logout",
    profile: "/authenticate/profile",
  },
};

export default path;
