// import React from 'react';
import { Store } from 'react-notifications-component';

export const showSuccess = ({ message }) => {
  console.log(message);
  Store.addNotification({
    title: 'Thành công',
    message: message || 'Thành công',
    type: 'success',
    insert: 'top',
    container: 'top-right',
    // animationIn: ['animate__animated', 'animate__fadeIn'],
    // animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
      // onScreen: true,
    },
    className: 'custom-success',
  });
};

export const showError = ({ message }) => {
  Store.addNotification({
    title: 'Error',
    message: message || 'Thất bại, vui lòng thử lại sau',
    type: 'danger',
    insert: 'top',
    container: 'top-right',
    // animationIn: ['animate__animated', 'animate__fadeIn'],
    // animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
      // onScreen: true,
    },
  });
};
