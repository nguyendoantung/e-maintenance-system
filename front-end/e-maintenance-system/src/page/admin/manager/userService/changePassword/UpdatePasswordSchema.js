import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useUpdatePassValidator = () => {
    const errorMessages = "Không được bỏ trống trường này";
    const updatePassSchema = yup
        .object({
            currentPassword: yup.string().required(errorMessages),
            newPassword: yup.string().required(errorMessages),
            repeatPassword: yup
                .string()
                .required(errorMessages)
                .oneOf(
                    [yup.ref("newPassword"), null],
                    "Mật khẩu không trùng khớp"
                ),
        })
        .required();

    return yupResolver(updatePassSchema);
};
