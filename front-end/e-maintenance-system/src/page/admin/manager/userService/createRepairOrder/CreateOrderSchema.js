import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useCreateOrderValidator = () => {
    const errorMessages = "Không được bỏ trống trường này";
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const createOrderSchema = yup
        .object({
            name: yup.string().required(errorMessages),
            phone: yup
                .string()
                .required(errorMessages)
                .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
            category: yup.string().required(errorMessages),
            location: yup.string().required(errorMessages),
            device: yup.string().required(errorMessages),
            note: yup.string(),
        })
        .required();

    return yupResolver(createOrderSchema);
};
