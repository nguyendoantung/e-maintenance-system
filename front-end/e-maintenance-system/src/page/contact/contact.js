import React from 'react';
import { Typography } from '@material-ui/core';

const Contact = () => {
  return (
    <>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          style={{
            fontWeight: '500',
            padding: '2%',
          }}
        >
          This page is made from Material UI v4 and Flask Python!
        </Typography>
        <Typography
          variant="h5"
          style={{
            fontWeight: '500',
            padding: '2%',
          }}
        >
          Made by{' '}
          <a href="https://github.com/nguyendoantung" target="blank">
            Nguyen Doan Tung
          </a>
        </Typography>
        <Typography>This is a contact page with no value.</Typography>
        <Typography>Enjoy another page! Thank you!</Typography>
      </div>
    </>
  );
};

export default Contact;
