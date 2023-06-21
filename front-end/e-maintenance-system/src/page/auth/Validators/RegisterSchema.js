import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useRegisterValidator = () => {
    const errorMessages = "Không được bỏ trống trường này";
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const registerSchema = yup
        .object({
            lastName: yup.string().required(errorMessages),
            firstName: yup.string().required(errorMessages),
            userName: yup.string().required(errorMessages),
            emailAddress: yup.string().required(errorMessages),
            password: yup.string().required(errorMessages),
            phone: yup
                .string()
                .required(errorMessages)
                .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
            confirmPolicy: yup
                .boolean()
                .required(errorMessages)
                .oneOf([true], "Cần đồng ý với điều khoản của chúng tôi"),
        })
        .required();

    return yupResolver(registerSchema);
};
