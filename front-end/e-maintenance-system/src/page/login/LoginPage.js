import React from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import LoginForm from "./LoginForm";
import { useMutation } from "react-query";
import rootApi from "../../api/rootApi";
import path from "../../api/path";
import makeRandom from "../../utils/RandomString";

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
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [randomToken] = React.useState(makeRandom(32));
  const { mutateAsync, isLoading } = useMutation(
    ["login", randomToken],
    (formValues) => {
      const { user, password } = formValues;
      const body = { user_name: user, password };
      return rootApi.post(path.auth.login, body);
    }
  );

  const onSubmitForm = (formValues) => {
    mutateAsync(formValues).then((res) => {
      const { data } = res || {};
      const { access_token: token } = data;
      localStorage.setItem("token", token);
      history.push("/");
    });
  };
  const onBackToList = () => {
    history.push("/");
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
