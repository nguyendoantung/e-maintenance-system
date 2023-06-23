import rootApi from '../api/rootApi';
import path from '../api/path';
import { useMutation } from 'react-query';

const CreateDevice = ({ adminID, body }) => {
  return useMutation(['create-device', adminID, body], () =>
    rootApi.post(path.admin.device.createDevice(), body)
  );
};

export default CreateDevice;
