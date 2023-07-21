import rootApi from '../api/rootApi';
import path from '../api/path';
import { useMutation } from 'react-query';

const AddDeviceOrder = ({ orderID }) =>
  useMutation(['add_device_order', orderID], (body) =>
    rootApi.put(path.admin.order.addDeviceOrder({ orderID }), body)
  );

export default AddDeviceOrder;
