import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Profile from "../../components/Profile";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, Button, Box } from "@material-ui/core";
import Content from "./Content";
import HomeIcon from "@material-ui/icons/Home";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { UilWrench } from "@iconscout/react-unicons";
import CreateRepairOrderPage from "../admin/manager/userService/createRepairOrder/CreateRepairOrderPage";
import Logo from "../../icon_image/logo.png";

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "-8px",
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const HomePage = (props) => {
    const history = useHistory();
    const [token, setToken] = React.useState(localStorage.getItem("token"));
    const [openRepair, setOpenRepair] = React.useState(false);

    React.useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [localStorage.getItem("token")]);

    const handleClickRepairNow = () => {
        if (!token) {
            history.push("/login");
        } else {
            setOpenRepair(true);
        }
    };

    const classes = useStyles();
    return (
        <>
            <ElevationScroll {...props}>
                <AppBar position="fixed">
                    <Toolbar
                        style={{
                            background: "white",
                            flex: 12,
                        }}
                    >
                        <>
                            <Box display={"flex"} alignItems={"center"}>
                                <img
                                    src={Logo}
                                    alt="icon logo"
                                    style={{
                                        maxWidth: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    className={classes.title}
                                    style={{
                                        color: "#588157",
                                    }}
                                >
                                    Dovi
                                </Typography>
                            </Box>

                            <Box display="flex" flex={5} style={{}}>
                                <Typography
                                    className={classes.title}
                                    style={{
                                        color: "#588157",
                                    }}
                                >
                                    Home
                                </Typography>
                                <Typography
                                    className={classes.title}
                                    style={{
                                        color: "#588157",
                                    }}
                                >
                                    About us
                                </Typography>
                                <Typography
                                    className={classes.title}
                                    style={{
                                        color: "#588157",
                                    }}
                                >
                                    Blog
                                </Typography>
                                <Typography
                                    className={classes.title}
                                    style={{
                                        color: "#588157",
                                    }}
                                >
                                    Contact
                                </Typography>
                            </Box>

                            <Button
                                color="inherit"
                                onClick={handleClickRepairNow}
                                style={{
                                    color: "#588157",
                                    textTransform: "none",
                                    boxShadow: "0px 0px 0px 0px",
                                }}
                            >
                                <UilWrench />
                                Sửa chữa ngay
                            </Button>
                            <CreateRepairOrderPage
                                open={openRepair}
                                token={token}
                                setOpen={setOpenRepair}
                            />
                            {!token ? (
                                <>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        to="/login"
                                        style={{
                                            color: "#fff",
                                            background: "#588157",
                                            textTransform: "none",
                                            boxShadow: "0px 0px 0px 0px",
                                        }}
                                    >
                                        Đăng nhập
                                    </Button>
                                </>
                            ) : (
                                <Profile setToken={setToken} token={token} />
                            )}
                        </>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Content />
        </>
    );
};

export default HomePage;
