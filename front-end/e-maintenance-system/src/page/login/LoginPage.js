import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import LoginForm from "./LoginForm";

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
    width: 500,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const isLoading = true;
  const onSubmitForm = () => {
    console.log("submit form");
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
