import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, reset, Form, change } from 'redux-form';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import InputField from '../../../../components/FormControls/InputField';
import Joi from 'joi';
import createValidator from '../../../../components/createValidator';

export const REJECT_FORM = 'REJECT_FORM';

const RejectOrderForm = (props) => {
  const { order, handleSubmit, onCancel, busy } = props;
  return (
    <>
      <Dialog onClose={onCancel} open>
        <Form onSubmit={handleSubmit}>
          <DialogTitle>Xác nhận từ chối</DialogTitle>
          <DialogContent>
            <Typography>
              Đơn <strong>{order?.full_name}</strong> sẽ bị từ chối, việc từ
              chối đồng nghĩa với việc đơn sẽ không thể được thực thi được nữa.
            </Typography>
            <Typography>Vui lòng điền lý do từ chối đơn:</Typography>
            <Field name="reason" component={InputField} naked dense />
            <DialogActions>
              <Button onClick={onCancel}>Hủy</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={busy}
                endIcon={busy ? <CircularProgress size={20} /> : <span />}
                color="primary"
              >
                Xác nhận
              </Button>
            </DialogActions>
          </DialogContent>
        </Form>
      </Dialog>
    </>
  );
};

const validateField = (values) => {
  let errors = {};
  const formJoiValidate = createValidator(schema);

  const { reason } = values;
  if (!reason) {
    errors.reason = 'Can co ly do';
  }

  if (!formJoiValidate(values)) return errors;
  return Object.assign(formJoiValidate(values), errors);
};

const schema = Joi.object({
  reason: Joi.string(),
});

export default compose(
  reduxForm({
    form: REJECT_FORM,
    validate: validateField,
  }),
  connect(null, { reset, change })
)(RejectOrderForm);
