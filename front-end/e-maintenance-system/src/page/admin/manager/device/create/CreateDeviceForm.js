import React from "react";
import {
  Box,
  DialogActions,
  CircularProgress,
  Button,
} from "@material-ui/core";
import InputField from "../../../../../components/FormControls/InputField";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, reset, Form, change } from "redux-form";
import AsyncSelectField from "../../../../../components/FormControls/AsyncSelectField";
import GetCategory from "../../../../../request/getCategory";
import ld from "lodash";

export const CREATE_DEVICE_FORM = "create_device_form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CreateDeviceForm = (props) => {
  const { handleSubmit, busy, onCancel } = props;
  const [images, setImages] = React.useState([]);
  const { data: dataCategory, isLoading: isLoadingCategory } = GetCategory();
  const categories = ld
    .chain(dataCategory?.data?.data ?? [])
    .map(({ id, name }) => {
      return {
        value: id,
        label: name,
      };
    })
    .orderBy("label")
    .value();

  const onChangeImage = (e) => {
    setImages([...URL.createObjectURL(e.target.files[0])]);
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Box sx={{ ...style, width: "auto" }}>
          <h2>Thêm thiết bị</h2>
          <Field
            name="name"
            label="Tên thiết bị"
            labelMultiline
            component={InputField}
          />
          <Field
            name="category"
            label="Loại"
            labelMultiline
            isLoading={isLoadingCategory}
            component={AsyncSelectField}
            options={categories}
          />
          <Field
            name="price"
            label="Giá"
            type="number"
            labelMultiline
            component={InputField}
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onChangeImage}
          />
          {/* <Field
            name="image"
            label="Ảnh mô tả"
            type="file"
            labelMultiline
            multiple
            accept="image/*"
            // aria-label="object-input"
            onChange={onChangeImage}
            component="input"
            // value={""}
          /> */}
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
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
        </Box>
      </Form>
    </>
  );
};

export default compose(
  reduxForm({
    form: CREATE_DEVICE_FORM,
    // validate: createValidator(schema),
  }),
  connect(null, { reset, change })
)(CreateDeviceForm);
