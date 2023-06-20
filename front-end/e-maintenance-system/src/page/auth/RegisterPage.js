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
    Grid,
    Grow,
    Hidden,
    Link,
    Paper,
    Slide,
    TextField,
    Typography,
} from "@material-ui/core";
import { ReactComponent as LogoIcon } from "../../icon_image/logo.svg";
import { LIST_ROUTE } from "../../routers/contants";
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
        display: "flex",
        marginLeft: "auto",
    },
    copyright: { marginTop: theme.spacing(5) },
}));
export default function RegisterPage() {
    const classes = useStyles();
    const [step, setStep] = React.useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };
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
                            <TextField
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
                                onClick={() => setStep(true)}
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
                            <TextField
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
                                onClick={() => setStep(false)}
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
