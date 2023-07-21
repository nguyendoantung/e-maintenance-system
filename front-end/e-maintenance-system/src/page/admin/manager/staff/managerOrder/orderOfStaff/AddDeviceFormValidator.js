import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const useAddDeviceOrderValidator = () => {
  const errorMessages = 'Không được bỏ trống trường này';
  const rejectOrderSchema = yup
    .object({
      device: yup.string().required(errorMessages),
      number: yup.string().required(errorMessages),
    })
    .required();

  return yupResolver(rejectOrderSchema);
};
