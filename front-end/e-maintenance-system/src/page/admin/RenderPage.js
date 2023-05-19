import React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import rootApi from "../../api/rootApi";
import path from "../../api/path";
import Page404 from "../Page404";
import ManagerPage from "./manager";

const RenderPage = (props) => {
  const history = useHistory();
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);
  const { mutateAsync } = useMutation(["logout", token], () => {
    return rootApi.post(path.auth.logout);
  });
  const { page } = props;
  if (page === "ManagerShop") {
    return <ManagerPage />;
  } else if (page === "UserOrder") {
    return "Manger order";
  } else if (page === "UpdateInfo") {
    return "Update info";
  } else if (page === "ChangePassword") {
    return "chang password";
  }
  // else if (page === "LogOut") {
  //   history.push("/");
  //   mutateAsync().then(() => {
  //     // setToken(null);
  //     // localStorage.clear();
  //   });
  // }
  return <Page404 />;
};

export default RenderPage;
