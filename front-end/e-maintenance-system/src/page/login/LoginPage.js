import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import LoginForm from "./LoginForm";
import { useMutation } from "react-query";
import rootApi from "../../api/rootApi";
import path from "../../api/path";
import useToken from "../../utils/token";
import { useLocation, useHistory } from "react-router-dom";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "flex",
    minWidth: 500,
    minHeight: 300,
    height: "flex",
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const LoginPage = () => {
  const history = useHistory();
  const { setToken } = useToken();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const { mutateAsync, isLoading } = useMutation(["login"], (formValues) => {
    const { user, password } = formValues;
    const body = { user, password };
    return rootApi.post(path.auth.login, body);
  });

  const onSubmitForm = (formValues) => {
    mutateAsync(formValues).then((res) => {
      const { data } = res || {};
      console.log(data);
      const { access_token: token } = data;
      setToken(token);
      history.push();
    });
  };
  const onBackToList = () => {
    console.log("back to list");
  };
  return (
    <Box m="auto" style={modalStyle} className={classes.paper}>
      <LoginForm
        onSubmit={onSubmitForm}
        busy={isLoading}
        onCancel={onBackToList}
      />
    </Box>
  );
};
export default LoginPage;
