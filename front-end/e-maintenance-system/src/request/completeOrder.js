import React from 'react';
import rootApi from '../api/rootApi';
import path from '../api/path';
import { useMutation } from 'react-query';

const CompleteOrder = ({ orderID }) => {
  return useMutation(['complete-order', orderID], () =>
    rootApi.put(path.admin.staff.completeOrder({ orderID }))
  );
};

export default CompleteOrder;
