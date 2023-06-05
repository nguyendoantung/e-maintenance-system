import React from 'react';
import { reduxForm, Field, reset, Form, change } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import InputField from '../../../../../components/FormControls/InputField';
import AsyncSelectComponent from '../../../../../components/FormControls/AsyncSelectField';
import { Button, DialogActions, CircularProgress } from '@material-ui/core';
import ld from 'lodash';
import Joi from 'joi';
import GetCategory from '../../../../../request/getCategory';
import createValidator from '../../../../../components/createValidator';

const FORM_NAME = 'REPAIR_ORDER_CREATION_FORM';

const CreateRepairOrderForm = (props) => {
  const { handleSubmit, busy, setOpen } = props;

  const { data: dataCategory, isLoading: isLoadingCategory } = GetCategory();
  const categories = ld
    .chain(dataCategory?.data?.data ?? [])
    .map(({ id, name }) => {
      return {
        value: id,
        label: name,
      };
    })
    .orderBy('label')
    .value();
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field name="name" label="Họ và tên" component={InputField} />
        <Field name="phone" label="Số điện thoại" component={InputField} />
        <Field
          component={AsyncSelectComponent}
          name="category"
          label="Loại sửa chữa"
          options={categories}
          loading={isLoadingCategory}
        />
        <Field name="location" label="Địa chỉ" component={InputField} />
        <Field
          name="device"
          label="Thiết bị cần sửa chữa"
          component={InputField}
        />
        <Field name="note" label="Ghi chú" component={InputField} />
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={busy ? <CircularProgress size={20} /> : <span />}
            disabled={busy}
          >
            Đặt
          </Button>
        </DialogActions>
      </Form>
    </>
  );
};

const schema = Joi.object({
  name: Joi.string().label('Họ và tên'),
  phone: Joi.string().label('Số điện thoại'),
  category: Joi.any().label('Loại sửa chữa'),
  location: Joi.string().label('Địa chỉ'),
  note: Joi.string().label('Ghi chú'),
  device: Joi.string().label('Thiết bị cần sửa chữa'),
});

const validateFields = (values) => {
  const errors = {};
  const formJoiValidate = createValidator(schema);
  const { name, phone, category, location } = values;
  if (!name) {
    errors.name = 'Vui lòng điền họ và tên!';
  } else if (!phone) {
    errors.phone = 'Vui lòng điền số điện thoại liên lạc!';
  } else if (!category) {
    errors.category = 'Vui lòng chọn loại sửa chữa!';
  } else if (!location) {
    errors.location = 'Vui lòng điền địa chỉ!';
  }

  if (!formJoiValidate(values)) return errors;
  return Object.assign(formJoiValidate(values), errors);
};

export default compose(
  reduxForm({
    form: FORM_NAME,
    validate: validateFields,
  }),
  connect(null, { reset, change })
)(CreateRepairOrderForm);
