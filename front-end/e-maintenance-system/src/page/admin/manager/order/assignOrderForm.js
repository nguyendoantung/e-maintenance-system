import React from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    CircularProgress,
    makeStyles,
    TextField,
    MenuItem,
    Box,
} from "@material-ui/core";
// import InputField from '../../../../components/FormControls/InputField';
import ld from "lodash";
import GetStaff from "../../../../request/getStaff";
import { useForm } from "react-hook-form";
import { useAssignOrderValidator } from "./validators/AssignOrderSchema";

export const ASSIGN_ORDER_FORM = "ASSIGN_FORM";
const useStyles = makeStyles((theme) => ({
    inputText: {
        marginTop: "2%",
    },
}));
const AssignOrderForm = (props) => {
    const { order, onSubmit, onCancel } = props;
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: useAssignOrderValidator(),
    });

    const { data, isLoading } = GetStaff({ page: 1, pageSize: 1000 });

    const staffs = ld
        .chain(data?.data?.user ?? [])
        .map(({ id, user_name }) => {
            return {
                value: id,
                label: user_name,
            };
        })
        .orderBy("label")
        .value();
    const onError = (err) => {
        console.log(err);
    };
    return (
        <>
            <Dialog onClose={onCancel} open>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit, onError)}
                >
                    <DialogTitle>Giao việc</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Chọn một nhân viên, người sẽ chịu trách nhiệm thực
                            thi đơn <strong>{order?.full_name}</strong>:
                        </Typography>
                        <TextField
                            {...register("staff")}
                            error={!!errors.staff}
                            helperText={errors.staff?.message}
                            variant="outlined"
                            name="staff"
                            id="staff"
                            label="Nhân viên"
                            required
                            fullWidth
                            value={watch("staff")}
                            autoFocus
                            select
                            className={classes.inputText}
                        >
                            {staffs.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}

                            {isLoading && (
                                <MenuItem>
                                    <Typography>Loading</Typography>
                                </MenuItem>
                            )}
                        </TextField>
                        <DialogActions>
                            <Button
                                onClick={() => {
                                    onCancel();
                                    reset();
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Xác nhận
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    );
};

export default AssignOrderForm;
