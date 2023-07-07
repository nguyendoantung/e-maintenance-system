import React from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router";
import CreateDeviceForm from "./CreateDeviceForm";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import rootApi from "../../../../../api/rootApi";
import path from "../../../../../api/path";
import { showSuccess, showError } from "../../../../../utils/notification";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    dialogTitle: {
        backgroundColor: theme.palette.primary.main,
        color: "#FFFFFF",
        textAlign: "center",
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: 0,
        color: "#FFFFFF",
    },
}));

const CreateDevicePage = (props) => {
    const { open, setOpen } = props;
    const { adminID } = useParams();
    const classes = useStyles();

    const { mutateAsync: asyncUploadFiles } = useMutation(
        ["upload-device-image", adminID],
        (listFiles) => {
            const body = new FormData();
            body.append("file", listFiles[0]);

            return rootApi.post(path.admin.device.uploadDeviceImage(), body);
        }
    );

    const { mutateAsync, isLoading } = useMutation(
        ["create-device", adminID],
        (formValues) => {
            const { name, price, category, url = "", unit } = formValues;
            const body = {
                name,
                price,
                category: category,
                image_url: url,
                unit,
            };

            return rootApi.post(path.admin.device.createDevice(), body);
        }
    );

    const handleSubmit = (formValues) => {
        // upload image to s3 first
        asyncUploadFiles(formValues.imageDevice)
            .then((res) => {
                const url = res?.data?.url;
                return url;
            })
            .then((url) => {
                formValues.url = url;
                mutateAsync(formValues)
                    .then((res) => {
                        showSuccess({
                            message:
                                res?.data?.data?.message ||
                                "Tạo thiết bị thành công.",
                        });
                        setOpen(false);
                    })
                    .catch((err) => {
                        showError({
                            message:
                                err.response?.data?.message ||
                                "Không thể tạo mới thiết bị, vui lòng thử lại sau.",
                        });
                    });
            })
            .catch((err) => {
                showError({
                    message:
                        err.response?.data?.message ||
                        "Không thể upload file, vui lòng thử lại",
                });
            });
    };
    return (
        <>
            <Dialog
                open={open}
                onClose={() => {
                    if (!isLoading) {
                        setOpen(false);
                    }
                }}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle
                    className={classes.dialogTitle}
                    id="simple-dialog-title"
                >
                    Đặt đơn sửa chữa
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <CreateDeviceForm
                            onSubmit={(data) => {
                                handleSubmit(data);
                            }}
                            open={open}
                            setOpen={setOpen}
                            busy={isLoading}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateDevicePage;
