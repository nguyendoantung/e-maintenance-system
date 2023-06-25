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
// import InputField from '../../../../components/FormControls/InputField';
import AsyncSelectComponent from '../../../../components/FormControls/AsyncSelectField';
import Joi from 'joi';
import createValidator from '../../../../components/createValidator';

export const ASSIGN_ORDER_FORM = 'REJECT_FORM';

const AssignOrderForm = (props) => {
  const { order, handleSubmit, onCancel, busy } = props;
  return (
    <>
      <Dialog onClose={onCancel} open>
        <Form onSubmit={handleSubmit}>
          <DialogTitle>Giao việc</DialogTitle>
          <DialogContent>
            <Typography>
              Chọn một nhân viên, người sẽ chịu trách nhiệm thực thi đơn{' '}
              <strong>{order?.full_name}</strong>
            </Typography>
            {/* <Typography>Vui lòng điền lý do từ chối đơn:</Typography> */}
            <Field name="staff" component={AsyncSelectComponent} naked dense />
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

  const { staff } = values;
  if (!staff) {
    errors.staff = 'Can co ly do';
  }

  if (!formJoiValidate(values)) return errors;
  return Object.assign(formJoiValidate(values), errors);
};

const schema = Joi.object({
  staff: Joi.any(),
});

export default compose(
  reduxForm({
    form: ASSIGN_ORDER_FORM,
    validate: validateField,
  }),
  connect(null, { reset, change })
)(AssignOrderForm);
