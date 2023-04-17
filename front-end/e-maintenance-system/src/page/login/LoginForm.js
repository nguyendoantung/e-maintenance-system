import React from "react";
import { reduxForm, Field, reset, Form, change } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import Joi from "joi";
import Button from "@material-ui/core/Button";
import InputField from "../../components/FormControls/InputField";
import createValidator from "../../components/createValidator";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";

export const FORM_NAME = "LOGIN_FORM";

const LoginForm = (props) => {
  const { handleSubmit, busy, onCancel } = props;
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field
          name="user"
          component={InputField}
          labelMultiline
          justifyAlignment={6}
          label="Email"
          placeholder="example@gmail.com"
        />
        <Field
          name="password"
          type="password"
          component={InputField}
          labelMultiline
          justifyAlignment={6}
          label="Email"
          placeholder="example@gmail.com"
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
            Login
          </Button>
        </DialogActions>
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
