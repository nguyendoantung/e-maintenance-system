import React from "react";
import { useMutation } from "react-query";
import { Box, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateRepairOrderForm from "./CreateRepairOrderForm";
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

const CreateRepairOrderPage = (props) => {
    const { open, token, setOpen } = props;
    const classes = useStyles();
    const { mutateAsync, isLoading } = useMutation(
        ["create-repair-order", token],
        (formValues) => {
            const { name, phone, category, location, note, device } =
                formValues;
            const body = {
                full_name: name,
                phone,
                category: category,
                location,
                note,
                device_suggest: device,
            };
            return rootApi.post(
                path.admin.userService.createRepairOrder(),
                body
            );
        }
    );
    const onCloseDialog = () => {
        if (!isLoading) {
            setOpen(false);
        }
    };
    const handleSubmit = (formValues) => {
        mutateAsync(formValues)
            .then((res) => {
                showSuccess({
                    message: res?.data?.data?.message || "Success!",
                });
                setOpen(false);
            })
            .catch((err) => {
                showError({
                    message: err.response?.data?.message || "That bai!",
                });
            });
    };
    return (
        <>
            <Dialog open={open} onClose={onCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle
                    className={classes.dialogTitle}
                    id="simple-dialog-title"
                >
                    Thêm mới thiết bị
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <CreateRepairOrderForm
                            token={token}
                            onSubmit={handleSubmit}
                            busy={isLoading}
                            open={open}
                            setOpen={setOpen}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateRepairOrderPage;
