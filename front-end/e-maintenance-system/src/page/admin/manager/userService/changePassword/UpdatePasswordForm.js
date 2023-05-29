import React from 'react';
import { reduxForm, Field, reset, Form, change } from 'redux-form';
import { Button, CircularProgress } from '@material-ui/core';
import InputField from '../../../../../components/FormControls/InputField';
import createValidator from '../../../../../components/createValidator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Joi from 'joi';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const FORM_NAME = 'CHANGE_PASSWORD_FORM';

function UpdatePasswordForm(props) {
  const { handleSubmit, busy } = props;
  const classes = useStyles();
  React.useEffect(() => {
    props.reset(FORM_NAME);
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field
          name="currentPassword"
          type="password"
          component={InputField}
          labelMultiline
          label="Mật khẩu hiện tại"
          placeholder="Mật khẩu hiện tại"
        />
        <Field
          name="newPassword"
          type="password"
          component={InputField}
          labelMultiline
          label="Mật khẩu mới"
          placeholder="Mật khẩu mới"
        />
        <Field
          name="repeatPassword"
          type="password"
          component={InputField}
          labelMultiline
          label="Xác nhận mật khẩu"
          placeholder="Xác nhận mật khẩu"
        />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => props.reset(FORM_NAME)}
        >
          Reset
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{
            textAlign: 'center',
          }}
          className={classes.button}
          endIcon={busy ? <CircularProgress size={20} /> : <span />}
          disabled={busy}
        >
          Cập nhật mật khẩu
        </Button>
      </Form>
    </>
  );
}

const validateFields = (values) => {
  let errors = {};
  const formJoiValidate = createValidator(schema);
  const { currentPassword, newPassword, repeatPassword } = values;
  if (!currentPassword || !newPassword || !repeatPassword) {
    if (!currentPassword) {
      errors.currentPassword = 'Mật khẩu hiện tại không được trống';
    }
    if (!newPassword) {
      errors.newPassword = 'Mật khẩu mới không được trống';
    }
    if (!repeatPassword) {
      errors.repeatPassword = 'Xác nhận mật khẩu không được trống';
    }
  } else {
    if (currentPassword === newPassword) {
      errors.newPassword = 'Mật khẩu mới không được trùng mật khẩu cũ';
    }
    if (repeatPassword !== newPassword) {
      errors.repeatPassword = 'Hai mật khẩu không khớp nhau';
    }
  }

  if (!formJoiValidate(values)) return errors;
  return Object.assign(formJoiValidate(values), errors);
};

const schema = Joi.object({
  // currentPassword: Joi.string().required().label('Mật khẩu hiện tại'),
  // newPassword: Joi.string().required().label('Mật khẩu mới'),
  // repeatPassword: Joi.string().required().label('Xác nhận mật khẩu'),
  currentPassword: Joi.string().label('Mật khẩu hiện tại'),
  newPassword: Joi.string().label('Mật khẩu mới'),
  repeatPassword: Joi.string().label('Xác nhận mật khẩu'),
}).options({ allowUnknown: true });

export default compose(
  reduxForm({
    form: FORM_NAME,
    validate: validateFields,
    // validate: createValidator(schema),
    // asyncValidate: validateFields,
    // asyncBlurFields: [],
  }),
  connect(null, { reset, change })
)(UpdatePasswordForm);
