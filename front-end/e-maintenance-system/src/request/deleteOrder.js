import rootApi from '../api/rootApi';
import path from '../api/path';
import { useMutation } from 'react-query';

const DeleteOrder = ({ orderId }) => {
  return useMutation(['delete-order', orderId], () =>
    rootApi.delete(path.admin.userService.deleteOrder({ orderId }))
  );
};

export default DeleteOrder;
