import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

import configureStore from "./redux/store";
import Routers from "./routers/Routers";

import { Provider } from "react-redux";
import Profile from "./components/Profile";
import useToken from "./utils/token";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Modal from "@material-ui/core/Modal";

import LoginPage from "./page/login/LoginPage";

const store = configureStore();

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      cacheTime: 0,
    },
  },
});

function App() {
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
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <Routers />
          {/* <BrowserRouter>
          <div className="App">
            <Header token={removeToken} />
            {!token && token !== "" && token !== undefined ? (
              <Login setToken={setToken} />
            ) : (
              <Profile />
            )}
          </div>
        </BrowserRouter> */}
          <div className={classes.root}>
            <AppBar position="fixed">
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
                    <Profile setToken={setToken} token />
                  )}
                </>
              </Toolbar>
            </AppBar>
          </div>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
