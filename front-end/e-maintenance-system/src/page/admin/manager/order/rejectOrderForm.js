import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, reset, Form, change } from "redux-form";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    CircularProgress,
    Box,
    makeStyles,
    TextField,
} from "@material-ui/core";
import InputField from "../../../../components/FormControls/InputField";
import Joi from "joi";
import createValidator from "../../../../components/createValidator";
import { useForm } from "react-hook-form";
import { useRejectOrderValidator } from "./validators/RejectOrderFormSchema";

export const REJECT_FORM = "REJECT_FORM";

const useStyles = makeStyles((theme) => ({
    inputText: {
        marginTop: "2%",
    },
}));
const RejectOrderForm = (props) => {
    const { order, onSubmit, onCancel } = props;
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: useRejectOrderValidator(),
    });
    return (
        <>
            <Dialog onClose={onCancel} open>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <DialogTitle>Xác nhận từ chối</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Đơn <strong>{order?.full_name}</strong> sẽ bị từ
                            chối, việc từ chối đồng nghĩa với việc đơn sẽ không
                            thể được thực thi được nữa.
                        </Typography>
                        <Typography>
                            Vui lòng điền lý do từ chối đơn:
                        </Typography>
                        <TextField
                            {...register("reason")}
                            error={!!errors.reason}
                            helperText={errors.reason?.message}
                            variant="outlined"
                            name="reason"
                            id="reason"
                            label="Lý do từ chối"
                            required
                            fullWidth
                            value={watch("reason")}
                            autoFocus
                            className={classes.inputText}
                        />
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

const validateField = (values) => {
    let errors = {};
    const formJoiValidate = createValidator(schema);

    const { reason } = values;
    if (!reason) {
        errors.reason = "Cần có lý do hủy đơn!";
    }

    if (!formJoiValidate(values)) return errors;
    return Object.assign(formJoiValidate(values), errors);
};

const schema = Joi.object({
    reason: Joi.string(),
});

export default compose(
    reduxForm({
        form: REJECT_FORM,
        validate: validateField,
    }),
    connect(null, { reset, change })
)(RejectOrderForm);
