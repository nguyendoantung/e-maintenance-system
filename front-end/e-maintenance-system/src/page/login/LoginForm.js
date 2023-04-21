import React from "react";
import { reduxForm, Field, reset, Form, change } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import Joi from "joi";
import {
  Button,
  Box,
  DialogActions,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import InputField from "../../components/FormControls/InputField";
import createValidator from "../../components/createValidator";

export const FORM_NAME = "LOGIN_FORM";

const LoginForm = (props) => {
  const { handleSubmit, busy, onCancel } = props;
  const [textSubmit, setTextSubmit] = React.useState("Login");
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Box
          m="auto"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Field
            name="user"
            component={InputField}
            labelMultiline
            label="Email"
            style={{
              width: "calc(100% + 64px)",
            }}
            placeholder="example@gmail.com"
          />
          <Field
            name="password"
            type="password"
            component={InputField}
            labelMultiline
            style={{
              width: "calc(100% + 64px)",
            }}
            label="Password"
          />
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={busy ? <CircularProgress size={20} /> : <span />}
              disabled={busy}
            >
              {textSubmit}
            </Button>
          </DialogActions>
        </Box>
      </Form>
    </>
  );
};

const schema = Joi.object({
  user: Joi.string()
    .email({ tlds: { allow: false } })
    .label("user"),
  password: Joi.string().required().label("password"),
});

export default compose(
  reduxForm({
    form: FORM_NAME,
    validate: createValidator(schema),
  }),
  connect(null, { reset, change })
)(LoginForm);
