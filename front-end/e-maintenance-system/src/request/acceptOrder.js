import rootApi from '../api/rootApi';
import path from '../api/path';
import { useMutation } from 'react-query';

const AcceptOrder = ({ orderId }) =>
  useMutation(['accept_order', orderId], () =>
    rootApi.put(path.admin.staff.acceptOrder({orderId}))
  );

export default AcceptOrder;
