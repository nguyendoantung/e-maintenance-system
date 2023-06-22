import React from 'react';
import {
  Box,
  ImageListItem,
  ImageList,
  DialogActions,
  CircularProgress,
  Button,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InputField from '../../../../../components/FormControls/InputField';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, reset, Form, change } from 'redux-form';
import AsyncSelectField from '../../../../../components/FormControls/AsyncSelectField';
import GetCategory from '../../../../../request/getCategory';
import ld from 'lodash';
import Joi from 'joi';
import createValidator from '../../../../../components/createValidator';

export const CREATE_DEVICE_FORM = 'CREATE_DEVICE_FORM';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CreateDeviceForm = (props) => {
  const {
    handleSubmit,
    busy,
    open,
    setOpen,
    listImages,
    setListImages,
    listFiles,
    setListFiles,
  } = props;

  React.useEffect(() => {
    props.reset(CREATE_DEVICE_FORM);
  }, []);

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

  const onChangeImage = (e) => {
    // const temp = listImages;
    // const temp2 = listFiles;
    // temp.push(URL.createObjectURL(e.target.files[0]));
    // temp2.push(e.target.files[0]);
    setListImages([URL.createObjectURL(e.target.files[0])]);
    setListFiles([e.target.files[0]]);
  };
  const removeChooseImage = (i) => {
    const s = listImages.filter((item, index) => index !== i);
    setListImages(s);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field
          name="name"
          label="Tên thiết bị"
          labelMultiline
          naked
          component={InputField}
        />
        <Field
          name="category"
          label="Loại"
          labelMultiline
          isLoading={isLoadingCategory}
          component={AsyncSelectField}
          naked
          options={categories}
        />
        <Field
          name="price"
          label="Giá"
          type="number"
          labelMultiline
          naked
          component={InputField}
        />
        <Field
          name="unit"
          label="Đơn vị"
          // type="number"
          labelMultiline
          naked
          component={InputField}
        />
        <input
          id="image"
          name="Anh"
          type="file"
          // multiple
          accept="image/*"
          onChange={onChangeImage}
        />
        {/* <Field
          name="image"
          component={renderField}
          // component="input"
          type="file"
          accept="image/*"
          onChange={onChangeImage}
          // value={listImages}
        /> */}
        <ImageList sx={{ width: 50, height: 50 }} rowHeight={50}>
          {listImages.map((image, index) => {
            return (
              <>
                <ImageListItem key={image?.img}>
                  <img
                    src={image}
                    style={{
                      maxWidth: '100px',
                      maxHeight: '100px',
                    }}
                  />
                  ;
                </ImageListItem>
                <HighlightOffIcon onClick={() => removeChooseImage(index)} />
              </>
            );
          })}
        </ImageList>
        <DialogActions>
          <Button
            onClick={() => {
              setListFiles([]);
              setListImages([]);
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={busy}
            color="primary"
            endIcon={busy ? <CircularProgress size={20} /> : <span />}
          >
            Create
          </Button>
        </DialogActions>
      </Form>
    </>
  );
};

const schema = Joi.object({
  name: Joi.string().label('Tên thiết bị'),
  category: Joi.any().label('Loại'),
  price: Joi.string().label('Giá'),
  unit: Joi.string().label('Đơn vị'),
});

const validateFields = (values) => {
  const errors = {};
  const formJoiValidate = createValidator(schema);
  const { name, category, price, unit } = values;
  if (!name) {
    errors.name = 'Yêu cầu tên thiết bị';
  } else if (!category) {
    errors.category = 'Yêu cầu loại thiết bị';
  } else if (!price) {
    errors.price = 'Yêu cầu giá tiền';
  } else if (!unit) {
    errors.unit = 'Yêu cầu đơn vị';
  }

  if (!formJoiValidate(values)) return errors;
  return Object.assign(formJoiValidate(values), errors);
};

export default compose(
  reduxForm({
    form: CREATE_DEVICE_FORM,
    multipartForm: true,
    validate: validateFields,
  }),
  connect(null, { reset, change })
)(CreateDeviceForm);
