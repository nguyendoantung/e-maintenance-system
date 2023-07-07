import React from "react";
import { Typography } from "@material-ui/core";
import UpdatePasswordForm from "./UpdatePasswordForm";
import rootApi from "../../../../../api/rootApi";
import path from "../../../../../api/path";
import { useMutation } from "react-query";
import { useParams } from "react-router";
import { showSuccess, showError } from "../../../../../utils/notification";
// import ChangePassword from "../../../../../request/changePasword"

const UpdatePasswordPage = () => {
    const { adminID } = useParams();
    const [clear, setClear] = React.useState(false);
    const { mutateAsync, isLoading } = useMutation(
        ["change_password", adminID],
        (formValues) => {
            const { currentPassword, newPassword, repeatPassword } = formValues;
            const body = {
                current_password: currentPassword,
                new_password: newPassword,
                repeat_password: repeatPassword,
            };
            return rootApi.post(path.admin.userService.changePassword(), body);
        }
    );
    const handleSubmit = (formValues) => {
        mutateAsync(formValues)
            .then((res) => {
                showSuccess({
                    message: res?.data?.data?.message || "Thanh cong",
                });
                setClear(true);
            })
            .catch((err) => {
                showError({
                    message: err.response?.data?.message || "That bai",
                });
            });
    };
    return (
        <>
            <Typography
                style={{
                    textAlign: "center",
                }}
            >
                Cập nhật mật khẩu của bạn
            </Typography>
            <UpdatePasswordForm
                onSubmit={handleSubmit}
                busy={isLoading}
                adminID={adminID}
                clear={clear}
            />
        </>
    );
};

export default UpdatePasswordPage;
