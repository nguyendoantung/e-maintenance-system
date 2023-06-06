import React from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import rootApi from '../../api/rootApi';
import path from '../../api/path';
import Page404 from '../Page404';
import ManagerPage from './manager';
import UpdatePasswordPage from './manager/userService/changePassword/UpdatePasswordPage';
import OrderManagerPage from './manager/userService';
import UpdateInfoPage from './manager/userService/updateInfo/UpdateInfoPage';
import ManagerOrderByStaffPage from './manager/staff/managerOrder/ManagerOrderByStaff';
import App from '../../App';

const RenderPage = (props) => {
  const history = useHistory();
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  React.useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);
  const { mutateAsync } = useMutation(['logout', token], () => {
    return rootApi.post(path.auth.logout);
  });
  const { page } = props;
  if (page === 'ManagerShop') {
    return <ManagerPage />;
  } else if (page === 'UserOrder') {
    return <OrderManagerPage />;
  } else if (page === 'UpdateInfo') {
    return <UpdateInfoPage />;
  } else if (page === 'ChangePassword') {
    return <UpdatePasswordPage />;
  } else if (page === 'ManagerOrder') {
    return <ManagerOrderByStaffPage />;
  } else if (page === 'LogOut') {
    history.push('/');
    mutateAsync().then(() => {
      setToken(null);
      localStorage.clear();
    });
    return (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
  return <Page404 />;
};

export default RenderPage;
