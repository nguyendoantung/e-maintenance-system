import rootApi from '../api/rootApi';
import path from '../api/path';
import { useQuery } from 'react-query';

const GetAllOrder = ({ adminID, page, pageSize }) => {
  return useQuery(
    ['get_all_order_of_user', adminID, page, pageSize],
    () =>
      rootApi.get(path.admin.userService.getAllRepairOrder({ page, pageSize })),
    {
      refetchInterval: 5000,
    }
  );
};

export default GetAllOrder;
