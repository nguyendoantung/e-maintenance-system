import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useAssignOrderValidator = () => {
    const errorMessages = "Không được bỏ trống trường này";
    const assignOrderSchema = yup
        .object({
            staff: yup.string().required(errorMessages),
        })
        .required();

    return yupResolver(assignOrderSchema);
};
