import rootApi from '../api/rootApi';
import path from '../api/path';
import { useQuery } from 'react-query';

const GetRepairOrder = ({ adminId, page, pageSize }) => {
  return useQuery(['get_repair_order_user', adminId, page, pageSize], () =>
    rootApi.get(path.admin.userService.getRepairOrder({ page, pageSize }))
  );
};

export default GetRepairOrder;
