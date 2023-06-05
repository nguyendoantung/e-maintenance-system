import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Profile from '../../components/Profile';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Content from './Content';
import HomeIcon from '@material-ui/icons/Home';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { UilWrench } from '@iconscout/react-unicons';
import CreateRepairOrderPage from '../admin/manager/userService/createRepairOrder/CreateRepairOrderPage';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '-8px',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HomePage = (props) => {
  const history = useHistory();
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [openRepair, setOpenRepair] = React.useState(false);

  React.useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  const handleClickRepairNow = () => {
    if (!token) {
      history.push('/login');
    } else {
      setOpenRepair(true);
    }
  };

  const classes = useStyles();
  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed">
          <Toolbar>
            <>
              <HomeIcon />
              <Typography variant="h6" className={classes.title}>
                Welcome
              </Typography>
              <Button color="inherit" onClick={handleClickRepairNow}>
                <UilWrench />
                Sửa chữa ngay
              </Button>
              <CreateRepairOrderPage
                open={openRepair}
                token={token}
                setOpen={setOpenRepair}
              />
              {!token ? (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Đăng nhập
                  </Button>
                </>
              ) : (
                <Profile setToken={setToken} token={token} />
              )}
            </>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Content />
    </>
  );
};

export default HomePage;
