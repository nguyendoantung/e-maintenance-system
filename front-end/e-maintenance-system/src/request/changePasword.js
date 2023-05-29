import rootApi from '../api/rootApi';
import path from '../api/path';
import { useMutation } from 'react-query';

const ChangePassword = ({ user_id }) =>
  useMutation(['change_password', user_id], () =>
    rootApi.post(path.admin.userService.changePassword)
  );

export default ChangePassword;
