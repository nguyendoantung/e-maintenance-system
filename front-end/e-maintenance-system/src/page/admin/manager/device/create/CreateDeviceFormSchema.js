import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useCreateDeviceValidator = () => {
    const errorMessages = "Không được bỏ trống trường này";
    const createDeviceSchema = yup
        .object({
            name: yup.string().required(errorMessages),
            category: yup.string().required(errorMessages),
            price: yup.number().required(errorMessages),
            unit: yup.string().required(errorMessages),
            imageDevice: yup.mixed().required(errorMessages),
        })
        .required();

    return yupResolver(createDeviceSchema);
};
