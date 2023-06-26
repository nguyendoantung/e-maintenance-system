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
import ld from 'lodash';
import AsyncSelectComponent from '../../../../components/FormControls/AsyncSelectField';
import Joi from 'joi';
import createValidator from '../../../../components/createValidator';
import GetStaff from '../../../../request/getStaff';

export const ASSIGN_ORDER_FORM = 'ASSIGN_FORM';

const AssignOrderForm = (props) => {
  const { order, handleSubmit, onCancel, busy } = props;

  const { data, isLoading } = GetStaff({ page: 1, pageSize: 1000 });

  const staffs = ld
    .chain(data?.data?.user ?? [])
    .map(({ id, user_name }) => {
      return {
        value: id,
        label: user_name,
      };
    })
    .orderBy('label')
    .value();

  return (
    <>
      <Dialog onClose={onCancel} open>
        <Form onSubmit={handleSubmit}>
          <DialogTitle>Giao việc</DialogTitle>
          <DialogContent>
            <Typography>
              Chọn một nhân viên, người sẽ chịu trách nhiệm thực thi đơn{' '}
              <strong>{order?.full_name}</strong>:
            </Typography>
            <Field
              name="staff"
              component={AsyncSelectComponent}
              isLoading={isLoading}
              options={staffs}
              naked
              dense
            />
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
    errors.staff = 'Cần có nhân viên!';
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
