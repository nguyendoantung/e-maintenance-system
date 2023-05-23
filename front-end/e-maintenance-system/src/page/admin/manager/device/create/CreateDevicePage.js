import React from "react";
import CreateDeviceForm from "./CreateDeviceForm";
import { Box } from "@material-ui/core";

const CreateDevicePage = (props) => {
  const { onClose } = props;
  return (
    <Box m="auto">
      <CreateDeviceForm
        // onSubmit={onSubmitForm}
        // busy={isLoading}
        onCancel={onClose}
      />
    </Box>
  );
};

export default CreateDevicePage;
