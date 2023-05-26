import React from 'react';
import { AppBar, Box, Paper, Typography } from '@material-ui/core';

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

const UpdatePasswordPage = () => {
  // const classes = useStyles();
  return (
    <>
      <Typography
        style={{
          textAlign: 'center',
        }}
      >
        Cập nhật mật khẩu của bạn
      </Typography>
      <Paper>This is your form</Paper>
    </>
  );
};

export default UpdatePasswordPage;
