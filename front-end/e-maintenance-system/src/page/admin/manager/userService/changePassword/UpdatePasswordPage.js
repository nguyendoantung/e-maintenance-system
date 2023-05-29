import React from 'react';
import { Typography } from '@material-ui/core';
import UpdatePasswordForm from './UpdatePasswordForm';
import rootApi from '../../../../../api/rootApi';
import path from '../../../../../api/path';
import { useMutation } from 'react-query';
import { useParams } from 'react-router';
// import ChangePassword from "../../../../../request/changePasword"

const UpdatePasswordPage = () => {
  const { adminID } = useParams();
  const { mutateAsync, isLoading } = useMutation(
    ['change_password', adminID],
    (formValues) => {
      const { currentPassword, newPassword, repeatPassword } = formValues;
      const body = {
        current_password: currentPassword,
        new_password: newPassword,
        repeat_password: repeatPassword,
      };
      return rootApi.post(path.admin.userService.changePassword(), body);
    }
  );
  const handleSubmit = (formValues) => {
    mutateAsync(formValues).then((res) => console.log(res));
  };
  return (
    <>
      <Typography
        style={{
          textAlign: 'center',
        }}
      >
        Cập nhật mật khẩu của bạn
      </Typography>
      <UpdatePasswordForm
        onSubmit={handleSubmit}
        busy={isLoading}
        adminID={adminID}
      />
    </>
  );
};

export default UpdatePasswordPage;
