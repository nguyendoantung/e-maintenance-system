import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AboutUs from "./AboutUs";
import Contact from "./Contact";

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        border: "0",
        backgroundColor: "#588157",
        top: "auto",
        bottom: 0,
        paddingTop: "2%",
    },
    paper: {
        height: 200,
        backgroundColor: "#588157",
        color: "white",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid container justifyContent="space-around" xs={12}>
                <Grid key={1} item sx={{ border: 0 }} xs={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <AboutUs />
                    </Paper>
                </Grid>
                <Grid key={2} item xs={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <Contact />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Footer;
