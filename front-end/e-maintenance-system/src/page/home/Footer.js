import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AboutUs from "./AboutUs";
import Contact from "./Contact";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: "0",
    backgroundColor: "#3f51b5",
  },
  paper: {
    height: 200,
    width: 400,
    backgroundColor: "#3f51b5",
    color: "white",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12} sx={{ border: 0 }}>
        <Grid container justifyContent="center" spacing={6}>
          <Grid key={1} item sx={{ border: 0 }}>
            <Paper className={classes.paper} elevation={0}>
              <AboutUs />
            </Paper>
          </Grid>
          <Grid key={2} item>
            <Paper className={classes.paper} elevation={0}>
              <Contact />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
