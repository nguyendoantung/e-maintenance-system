import rootApi from '../api/rootApi';
import path from '../api/path';
import { useQuery } from 'react-query';

const GetHistoryOneOrder = ({ orderId, enabled }) => {
  return useQuery(
    ['get_history_order', orderId],
    () => rootApi.get(path.admin.userService.getHistoryOneOrder({ orderId })),
    {
      //   refetchInterval: 5000,
      enabled: enabled,
    }
  );
};

export default GetHistoryOneOrder;
