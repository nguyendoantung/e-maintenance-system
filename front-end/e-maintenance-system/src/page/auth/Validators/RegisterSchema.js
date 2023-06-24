import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useRegisterValidator = (step) => {
    const errorMessages = "Không được bỏ trống trường này";
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const registerSchema = yup
        .object({
            lastName: yup.string().required(errorMessages),
            firstName: yup.string().required(errorMessages),
            username: yup.string().required(errorMessages),
            email: yup
                .string()
                .required(errorMessages)
                .email("email không hợp lệ"),
            password: yup
                .string()
                .required(errorMessages)
                .min(8, "Phải có ít nhất 8 kí tự"),
            phone: yup
                .string()
                .required(errorMessages)
                .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
            birthday: yup.string().required(errorMessages),
            confirmPolicy: yup
                .boolean()
                .oneOf([true], "Cần đồng ý với điều khoản của chúng tôi"),
        })
        .required();
    return yupResolver(registerSchema);
};
