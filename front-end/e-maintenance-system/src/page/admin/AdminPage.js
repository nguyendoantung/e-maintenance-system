import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Drawer } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Features from './drawer';
import RenderPage from './RenderPage';
import parseJwt from '../../utils/parseJwt';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const AdminPage = (props) => {
  const [page, setPage] = React.useState('UserOrder');
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  React.useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);
  const role = parseJwt(token)?.sub?.role || '';
  const userId = parseJwt(token)?.sub?.id || '';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Features page={page} setPage={setPage} role={role} userId={userId} />
        </Drawer>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <Features page={page} setPage={setPage} role={role} userId={userId} />
        </Drawer>
      </nav>
      <main className={classes.content}>
        <RenderPage page={page} setPage={setPage} />
      </main>
    </div>
  );
};

AdminPage.propTypes = {
  window: PropTypes.func,
};

export default AdminPage;
