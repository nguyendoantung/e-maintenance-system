import React from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import LoginForm from "./LoginForm";
import { Link as LinkCP } from "react-router-dom";
import { useMutation } from "react-query";
import rootApi from "../../api/rootApi";
import path from "../../api/path";
import makeRandom from "../../utils/RandomString";
import {
    Avatar,
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    Grow,
    Hidden,
    Link,
    Paper,
    Slide,
    TextField,
    Typography,
    createTheme,
} from "@material-ui/core";
import { ReactComponent as LogoIcon } from "../../icon_image/logo.svg";
import { LIST_ROUTE } from "../../routers/contants";
import { useRegisterValidator } from "./Validators/RegisterSchema";
import { useForm } from "react-hook-form";
import authencation from "../../request/authencation";
import { showSuccess, showError } from "../../utils/notification";
const useStyles = makeStyles((theme) => ({
    paper: {
        width: "flex",
        minWidth: 500,
        minHeight: 300,
        backgroundColor: theme.palette.background.paper,
        border: "0px solid #000",
        borderRadius: "5px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#578056",
    },
    formContainer: { marginTop: theme.spacing(1), width: "100%" },
    btnSubmit: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        backgroundColor: "#3a5a40",
        color: "white",
        textTransform: "none",
        fontSize: 18,
        paddingBlock: "1.5%",
        boxShadow: "0px 0px 0px 0px",
        display: "flex",
        marginLeft: "auto",
    },
    copyright: { marginTop: theme.spacing(5) },
    checkboxAccept: {
        fontSize: 13,
    },
}));
export default function RegisterPage() {
    const classes = useStyles();
    const [step, setStep] = React.useState(false);
    const history = useHistory();
    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: useRegisterValidator(),
        defaultValues: {
            confirmPolicy: false,
        },
    });
    const onSubmitStepOne = (data) => {
        if (!errors.password && errors.email) {
            setStep(true);
        }
    };
    const { mutate: sendRegister, isLoading } = useMutation({
        mutationKey: ["register"],
        mutationFn: (data) => authencation.register(data),
        onSuccess: (res) => {
            showSuccess({ message: res?.data?.msg || "Đăng kí thành công" });
            history.push("/");
        },
        onError: (res) => {
            showError({ message: res?.response?.data?.msg || "Đăng kí thất bại!" });
        },
    });
    const onSubmitStepTwo = (data) => {
        const dataSubmit = {
            email: data.email,
            user_name: data.username,
            password: data.password,
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
        };
        sendRegister(dataSubmit);
    };
    const onErr = (err) => {
        if (!errors.password && !errors.email && !err.password && !err.email) {
            setStep(true);
            clearErrors([
                "firstName",
                "lastName",
                "username",
                "birthday",
                "phone",
                "confirmPolicy",
            ]);
        }
    };
    const now = new Date();
    return (
        <>
            <Grow
                in={!step}
                style={{
                    transformOrigin: "right center",
                    display: step ? "none" : "block",
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={7}
                    md={4}
                    component={Paper}
                    elevation={6}
                    square
                    style={{
                        marginBlock: "2%",
                        borderRadius: 8,
                    }}
                >
                    <Box
                        my={4}
                        mx={4}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            style={{
                                fontWeight: "700",
                                color: "#578056",
                                paddingBottom: "2%",
                            }}
                        >
                            Bước 1/2
                        </Typography>
                        <Box>
                            <Typography
                                variant="h4"
                                style={{
                                    fontWeight: "700",
                                    color: "#578056",
                                }}
                            >
                                Tạo tài khoản mới
                            </Typography>
                            <Typography
                                variant="h6"
                                style={{
                                    fontWeight: "500",
                                    color: "#578056",
                                }}
                            >
                                Đăng ký với email
                            </Typography>
                        </Box>
                        <Box display={"flex"}>
                            <Typography variant="subtitle1">
                                Đã có tài khoản?{" "}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component={LinkCP}
                                to={LIST_ROUTE.LOGIN_PAGE}
                                style={{
                                    paddingLeft: "8px",
                                    textDecoration: "none",
                                    color: "#578056",
                                }}
                            >
                                Đăng nhập
                            </Typography>
                        </Box>

                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(onSubmitStepOne, onErr)}
                            className={classes.formContainer}
                        >
                            <TextField
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                className={classes.btnSubmit}
                            >
                                Tiếp theo
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grow>
            <Grow
                in={step}
                style={{
                    transformOrigin: "right center",
                    display: step ? "block" : "none",
                }}
                {...{ timeout: 1000 }}
            >
                <Grid
                    item
                    xs={12}
                    sm={7}
                    md={4}
                    component={Paper}
                    elevation={6}
                    square
                    style={{
                        marginBlock: "2%",
                        borderRadius: 8,
                    }}
                >
                    <Box
                        my={4}
                        mx={4}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            style={{
                                fontWeight: "700",
                                color: "#578056",
                                paddingBottom: "2%",
                            }}
                        >
                            Bước 2/2
                        </Typography>
                        <Box>
                            <Typography
                                variant="h4"
                                style={{
                                    fontWeight: "700",
                                    color: "#578056",
                                }}
                            >
                                Tạo tài khoản mới
                            </Typography>
                            <Typography
                                variant="h6"
                                style={{
                                    fontWeight: "500",
                                    color: "#578056",
                                }}
                            >
                                Đăng ký với email
                            </Typography>
                        </Box>
                        <Box display={"flex"}>
                            <Typography variant="subtitle1">
                                Đã có tài khoản?{" "}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component={LinkCP}
                                to={LIST_ROUTE.LOGIN_PAGE}
                                style={{
                                    paddingLeft: "8px",
                                    textDecoration: "none",
                                    color: "#578056",
                                }}
                            >
                                Đăng nhập
                            </Typography>
                        </Box>

                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(onSubmitStepTwo)}
                            className={classes.formContainer}
                        >
                            <TextField
                                {...register("username")}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <Box
                                style={{
                                    display: "flex",
                                    flex: 10,
                                }}
                            >
                                <TextField
                                    {...register("firstName")}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    name="firstName"
                                    label="First name"
                                    type="text"
                                    id="firstName"
                                    autoComplete="first-name"
                                    style={{
                                        flex: 4.5,
                                    }}
                                />
                                <TextField
                                    {...register("lastName")}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    name="lastName"
                                    label="Last name"
                                    type="text"
                                    id="lastName"
                                    autoComplete="last-name"
                                    style={{
                                        flex: 5,
                                        marginLeft: "3%",
                                    }}
                                />
                            </Box>
                            <TextField
                                {...register("phone")}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Phone number"
                                name="phone"
                                autoComplete="phone"
                                autoFocus
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...register("confirmPolicy")}
                                        style={{
                                            color: "#386641",
                                            borderColor: "#386641",
                                            paddingInline: "2%",
                                            paddingBlock: 0,
                                        }}
                                    />
                                }
                                label=" By clicking Create account, I agree that I have read and accepted the Terms of Use and Privacy Policy."
                                style={{
                                    alignItems: "flex-start",
                                    marginBlock: "2%",
                                }}
                                classes={{
                                    label: classes.checkboxAccept,
                                }}
                            />
                            <FormHelperText>
                                {errors.confirmPolicy?.message}
                            </FormHelperText>
                            <Button
                                type="submit"
                                variant="contained"
                                className={classes.btnSubmit}
                            >
                                Hoàn thành
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grow>
        </>
    );
}
