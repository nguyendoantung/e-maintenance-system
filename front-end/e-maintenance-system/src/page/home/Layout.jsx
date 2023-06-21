import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Profile from "../../components/Profile";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Hidden,
    Drawer,
    IconButton,
} from "@material-ui/core";
import Content from "./Content";
import HomeIcon from "@material-ui/icons/Home";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { UilWrench } from "@iconscout/react-unicons";
import CreateRepairOrderPage from "../admin/manager/userService/createRepairOrder/CreateRepairOrderPage";
import Logo from "../../icon_image/logo.png";
import Footer from "./Footer";
import DrawerHome from "./components/DrawerHome";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { LIST_ROUTE } from "../../routers/contants";
const drawerWidth = 240;
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
        // margin: "-8px",
        flexGrow: 1,
        zIndex: 1,
        overflow: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    title: {
        // flexGrow: 1,
        color: "#588157",
    },
    routeTitle: {
        paddingRight: "6%",
        fontWeight: "500",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        marginBottom: "10px",
    },
    navIconShow: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            position: "relative",
        },
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
    },
}));

const Layout = (props) => {
    const { children } = props;
    const history = useHistory();
    const location = useLocation();
    const [token, setToken] = React.useState(localStorage.getItem("token"));
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    React.useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [localStorage.getItem("token")]);

    const handleClickRepairNow = () => {
        if (!token) {
            history.push("/login");
        } else {
            alert("nhảy sang trang đặt");
            // setOpenRepair(true);
        }
    };

    const classes = useStyles();
    const appBarRoute = [
        {
            name: "Home",
            route: LIST_ROUTE.HOME_PAGE,
        },
        {
            name: "About us",
            route: LIST_ROUTE.ABOUT_US,
        },
        {
            name: "Blog",
            route: LIST_ROUTE.BLOG,
        },
        {
            name: "Contact",
            route: LIST_ROUTE.CONTACT,
        },
    ];

    return (
        <>
            <div className={classes.root}>
                <ElevationScroll {...props}>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar
                            style={{
                                background: "white",
                                justifyContent: "space-between",
                            }}
                        >
                            <IconButton onClick={handleDrawerToggle}>
                                <Box display={"flex"} alignItems={"center"}>
                                    <img
                                        src={Logo}
                                        alt="icon logo"
                                        style={{
                                            maxWidth: "50%",

                                            height: "auto",
                                            // objectFit: "cover",
                                        }}
                                        width={"50px"}
                                    />
                                    <Typography
                                        variant="h6"
                                        className={classes.title}
                                    >
                                        Dovi
                                    </Typography>
                                </Box>
                            </IconButton>
                            <Hidden xsDown>
                                <Box
                                    display="flex"
                                    style={{
                                        // backgroundColor: "red",
                                        flex: 1,
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    {appBarRoute.map((item, index) => {
                                        return (
                                            <Typography
                                                key={index}
                                                variant="subtitle1"
                                                className={[classes.routeTitle]}
                                                component={Link}
                                                to={item.route ?? "/"}
                                                style={{
                                                    color:
                                                        location?.pathname ===
                                                        item.route
                                                            ? "#6a994e"
                                                            : "#343a40",

                                                    textDecoration: "none",
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                        );
                                    })}
                                </Box>
                            </Hidden>
                            <Box textAlign={"center"}>
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
                                    <Profile
                                        setToken={setToken}
                                        token={token}
                                    />
                                )}
                            </Box>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <Toolbar />
                <Hidden smUp>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // better performance on mobile
                        }}
                    >
                        <DrawerHome />
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar}>{children}</div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
