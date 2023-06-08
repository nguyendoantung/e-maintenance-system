import rootApi from '../api/rootApi';
import path from '../api/path';
import { useQuery } from 'react-query';

const GetRepairOrder = ({ adminID, page, pageSize }) => {
  return useQuery(
    ['get_repair_order_user', adminID, page, pageSize],
    () =>
      rootApi.get(path.admin.userService.getRepairOrder({ page, pageSize })),
    {
      refetchInterval: 5000,
    }
  );
};

export const GetRepairOrderForStaff = ({ adminId, page, pageSize }) => {
  return useQuery(
    ['get_repair_order_staff', adminId, page, pageSize],
    () => rootApi.get(path.admin.staff.listRepairOrder({ page, pageSize })),
    {
      refetchInterval: 5000,
    }
  );
};

export const GetRepairOrderOfStaff = ({ adminID, page, pageSize }) => {
  return useQuery(
    ['get_repair_order_of_staff', adminID, page, pageSize],
    () =>
      rootApi.get(path.admin.staff.orderOfStaff({ adminID, page, pageSize })),
    {
      refetchInterval: 5000,
    }
  );
};

export default GetRepairOrder;
