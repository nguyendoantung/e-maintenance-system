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
    FormControl,
    FormControlLabel,
    Grid,
    Grow,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import { ReactComponent as LogoIcon } from "../../icon_image/logo.svg";
import { LIST_ROUTE } from "../../routers/contants";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="/">
                Dovi's Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        // position: "absolute",
        width: "flex",
        minWidth: 500,
        minHeight: 300,
        // height: "flex",
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
    formContainer: { marginTop: theme.spacing(1) },
    btnSubmit: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        backgroundColor: "#3a5a40",
        color: "white",
        textTransform: "none",
        fontSize: 18,
        paddingBlock: "1.5%",
        boxShadow: "0px 0px 0px 0px",
    },
    copyright: { marginTop: theme.spacing(5) },
}));
export default function LoginPage() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = React.useState();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };
    // const history = useHistory();
    // const [modalStyle] = React.useState(getModalStyle);
    // const [randomToken] = React.useState(makeRandom(32));
    // const { mutateAsync, isLoading } = useMutation(
    //     ["login", randomToken],
    //     (formValues) => {
    //         const { user, password } = formValues;
    //         const body = { user_name: user, password };
    //         return rootApi.post(path.auth.login, body);
    //     }
    // );

    // const onSubmitForm = (formValues) => {
    //     mutateAsync(formValues).then((res) => {
    //         const { data } = res || {};
    //         const { access_token: token } = data;
    //         localStorage.setItem("token", token);
    //         history.push("/");
    //     });
    // };
    // const onBackToList = () => {
    //     history.push("/");
    // };
    return (
        <>
            <Grow
                in={true}
                style={{ transformOrigin: "right center" }}
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
                        marginBlock: "4%",
                        borderRadius: 8,
                    }}
                >
                    <Box
                        my={8}
                        mx={4}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <Avatar
                                className={classes.avatar}
                                variant="circle"
                                style={{
                                    aspectRatio: "1",
                                    height: "auto",
                                    width: "20%",
                                }}
                            >
                                <LogoIcon
                                    fill="#fff"
                                    style={{
                                        height: "70%",
                                        width: "70%",
                                    }}
                                />
                            </Avatar>
                            <Typography
                                component="h1"
                                variant="h4"
                                style={{
                                    fontWeight: "500",
                                    color: "#578056",
                                }}
                            >
                                Dovi
                            </Typography>
                        </Box>

                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            className={classes.formContainer}
                        >
                            <TextField
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
                            {/* <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            /> */}
                            <FormControl
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                            >
                                <InputLabel htmlFor="password">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    label="Password*"
                                    margin="normal"
                                    required
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        style={{
                                            color: "#386641",
                                            borderColor: "#386641",
                                        }}
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.btnSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link
                                        href="#"
                                        variant="body2"
                                        component={LinkCP}
                                        to={LIST_ROUTE.REGISTER}
                                    >
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright className={classes.copyright} />
                        </Box>
                    </Box>
                </Grid>
            </Grow>
        </>
    );
}