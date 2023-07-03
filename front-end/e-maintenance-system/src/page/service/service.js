import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2%',
  },
}));

const Service = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          Lựa chọn đúng đắn, thoải mái tận hưởng dịch vụ
        </Typography>
      </div>
    </>
  );
};

export default Service;
