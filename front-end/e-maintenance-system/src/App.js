import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

import configureStore from "./redux/store";
import Routers from "./routers/Routers";

import { Provider } from "react-redux";
import Profile from "./components/Profile";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  CssBaseline,
} from "@material-ui/core";

import LoginPage from "./page/login/LoginPage";
import News from "./page/news/News";

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
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
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
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
