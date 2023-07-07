import React from "react";
import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useUpdatePassValidator } from "./UpdatePasswordSchema";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    inputText: {
        marginBottom: "2%",
    },
}));

function UpdatePasswordForm(props) {
    const { onSubmit, clear, busy } = props;
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: useUpdatePassValidator(),
    });
    React.useEffect(() => {
        reset();
    }, [clear, reset]);

    return (
        <>
            <Box
                component={"form"}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    {...register("currentPassword")}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword?.message}
                    variant="outlined"
                    name="currentPassword"
                    id="currentPassword"
                    label="Mật khẩu hiện tại"
                    required
                    fullWidth
                    value={watch("currentPassword")}
                    autoFocus
                    className={classes.inputText}
                    type="password"
                />
                <TextField
                    {...register("newPassword")}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    variant="outlined"
                    name="newPassword"
                    id="newPassword"
                    label="Mật khẩu mới"
                    required
                    fullWidth
                    value={watch("newPassword")}
                    autoFocus
                    className={classes.inputText}
                    type="password"
                />
                <TextField
                    {...register("repeatPassword")}
                    error={!!errors.repeatPassword}
                    helperText={errors.repeatPassword?.message}
                    variant="outlined"
                    name="repeatPassword"
                    id="repeatPassword"
                    label="Xác nhận mật khẩu"
                    required
                    fullWidth
                    value={watch("repeatPassword")}
                    autoFocus
                    className={classes.inputText}
                    type="password"
                />
                <Button
                    disabled={busy}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={() => reset()}
                >
                    Reset
                </Button>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={{
                        textAlign: "center",
                    }}
                    className={classes.button}
                    disabled={busy}
                    endIcon={busy ? <CircularProgress /> : <span />}
                >
                    Cập nhật mật khẩu
                </Button>
            </Box>
        </>
    );
}

export default UpdatePasswordForm;
