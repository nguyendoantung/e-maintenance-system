import React from "react";
import { Box, CircularProgress, Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

export default ({ error, loading }) => {
  if (loading)
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="space-around">
          <CircularProgress size={30} />
        </Box>
      </Container>
    );
  if (error) {
    if (error.response?.status === 400) return null;

    return (
      <Container maxWidth="md">
        <Alert severity="error">
          <AlertTitle>Something wrong!</AlertTitle>
          Please try again or contact agent for further support
        </Alert>
      </Container>
    );
  }
  return <div />;
};
