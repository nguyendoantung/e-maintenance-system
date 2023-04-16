export const root = process.env.REACT_APP_URL_API;

const path = {
  auth: {
    login: "/authenticate/login",
    profile: "/authenticate/profile",
  },
};

export default path;
