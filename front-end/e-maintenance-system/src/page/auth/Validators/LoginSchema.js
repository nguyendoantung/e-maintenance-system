import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useLoginValidator = () => {
    const errorMessages = "Không được bỏ trống trường này";
    const loginSchema = yup
        .object({
            userNameOrEmail: yup.string().required(errorMessages),
            password: yup.string().required(errorMessages),
        })
        .required();

    return yupResolver(loginSchema);
};
