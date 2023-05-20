import React from "react";
import {
  Typography,
  makeStyles,
  Grid,
  SvgIcon,
  Paper,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";

// styles
const useStyles = makeStyles(() => ({
  container: {
    minHeight: 226,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  icon: {
    width: 90,
    height: 140,
  },
  iconTitle: {
    marginRight: 12,
  },
  wrapTitle: {
    display: "flex",
  },
}));

export default ({
  icon,
  viewport,
  title,
  description,
  children,
  iconTitle,
  sizeIcon,
}) => {
  const styles = useStyles();

  return (
    <Paper className={styles.container}>
      <Grid container className={styles.content}>
        <Grid item md="auto">
          <SvgIcon
            component={icon}
            className={styles.icon}
            style={sizeIcon || {}}
            color="primary"
            viewBox={viewport || "0 0 90 140"}
          />
        </Grid>
        <Grid item xs="auto">
          <Box style={{ marginLeft: 28 }} />
        </Grid>
        <Grid item md="auto">
          <span className={styles.wrapTitle}>
            {iconTitle && (
              <SvgIcon
                component={iconTitle}
                className={styles.iconTitle}
                color="primary"
                viewBox="0 0 25 25"
              />
            )}
            <Typography data-testid="title-empty" variant="h2" gutterBottom>
              {title}
            </Typography>
          </span>
          <Typography
            data-testid="description-empty"
            style={{ marginBottom: 28 }}
          >
            {description}
          </Typography>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
};
