import React from "react";
import Profile from "../../components/Profile";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Modal } from "@material-ui/core";
import LoginPage from "../login/LoginPage";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "-8px",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HomePage = () => {
  const [token, setToken] = React.useState(localStorage.getItem("token"));

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "gray",
        }}
      >
        <Toolbar>
          <>
            <Typography variant="h6" className={classes.title}>
              Welcome
            </Typography>
            {!token ? (
              <>
                <Button color="inherit" onClick={handleOpen}>
                  Đăng nhập
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <LoginPage setOpen={setOpen} />
                </Modal>
              </>
            ) : (
              <Profile setToken={setToken} token={token} />
            )}
          </>
        </Toolbar>
      </AppBar>
      <AppBar
        position="fixed"
        style={{
          top: "auto",
          bottom: 0,
          backgroundColor: "gray",
        }}
      >
        <Toolbar>
          <Footer />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default HomePage;
