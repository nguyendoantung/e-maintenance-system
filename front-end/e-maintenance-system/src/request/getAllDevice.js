import rootApi from '../api/rootApi';
import path from '../api/path';
import { useQuery } from 'react-query';

const GetAllDevice = () => {
  return useQuery(['get-all-device'], () =>
    rootApi.get(path.admin.device.all_device())
  );
};

export default GetAllDevice;
