import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useRejectOrderValidator = () => {
    const errorMessages = "Không được bỏ trống trường này";
    const rejectOrderSchema = yup
        .object({
            reason: yup.string().required(errorMessages),
        })
        .required();

    return yupResolver(rejectOrderSchema);
};
