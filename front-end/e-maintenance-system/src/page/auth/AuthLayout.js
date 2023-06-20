import React from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "react-query";
import rootApi from "../../api/rootApi";
import path from "../../api/path";
import makeRandom from "../../utils/RandomString";
import { Grid, Hidden } from "@material-ui/core";
// import { LockOutlined } from "@material-ui/icons";
import backgroundLogin from "../../image/background_login.jpeg";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({}));

const AuthLayout = ({ children, ...props }) => {
    return (
        <>
            {/* <Box className={classes.paper}>
                <LoginForm
                    onSubmit={onSubmitForm}
                    busy={isLoading}
                    onCancel={onBackToList}
                />
            </Box> */}
            <Grid
                container
                component="main"
                style={{
                    height: "100vh",
                    backgroundImage: `url(${backgroundLogin})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "light"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    justifyContent: "center",
                }}
            >
                {/* <LoginForm1 /> */}
                <Hidden mdDown>
                    <Grid item xs={false} sm={5} md={6} />
                </Hidden>

                {children}
            </Grid>
        </>
    );
};
export default AuthLayout;
