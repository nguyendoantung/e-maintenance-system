import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useCreateDeviceValidator = () => {
    const errorMessages = "Không được bỏ trống trường này";
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    const createDeviceSchema = yup
        .object({
            name: yup.string().required(errorMessages),
            category: yup.string().required(errorMessages),
            price: yup
                .number()
                .required(errorMessages)
                .min(0)
                .typeError(errorMessages),
            unit: yup.string().required(errorMessages),
            imageDevice: yup
                .mixed()
                .required(errorMessages)
                .test({
                    message: "Hãy chọn ảnh cho thiết bị",
                    test: (file) => {
                        const isValid = !!file[0];
                        return isValid;
                    },
                })
                .test({
                    message: `File too big, can't exceed 25MB`,
                    test: (file) => {
                        const isValid = file[0]?.size < MAX_FILE_SIZE;
                        return isValid;
                    },
                }),
        })
        .required();

    return yupResolver(createDeviceSchema);
};
