import React from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router';
import CreateDeviceForm from './CreateDeviceForm';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import CreateDevice from '../../../../../request/createDevice';
import rootApi from '../../../../../api/rootApi';
import path from '../../../../../api/path';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: 0,
    color: '#FFFFFF',
  },
}));

const CreateDevicePage = (props) => {
  const { open, setOpen } = props;
  const { adminID } = useParams();
  const [listImages, setListImages] = React.useState([]);
  const [listFiles, setListFiles] = React.useState([]);
  const classes = useStyles();

  const { mutateAsync: asyncUploadFiles } = useMutation(
    ['upload-device-image', adminID],
    (listFiles) => {
      const body = new FormData();
      body.append('file', listFiles[0]);

      return rootApi.post(path.admin.device.uploadDeviceImage(), body);
    }
  );

  const { mutateAsync, isLoading } = useMutation(
    ['create-device', adminID],
    (formValues) => {
      const { name, price, category } = formValues;
      const body = {
        name,
        price,
        category: category?.value,
        object_url: listImages,
      };

      return rootApi.post(path.admin.device.createDevice(), body);
    }
  );

  const handleSubmit = (formValues) => {
    // upload image to s3 first
    asyncUploadFiles(listFiles)
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        // console.log(error);
      });

    mutateAsync(formValues)
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        // console.log(error);
      });
    // const { name, price, category } = formValues;
    // const body = {
    //   name,
    //   price,
    //   category: category?.value,
    //   object_url: listImages,
    // };
    // console.log(listImages);
    // console.log(formValues);
    // console.log(listFiles);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className={classes.dialogTitle} id="simple-dialog-title">
          Đặt đơn sửa chữa
        </DialogTitle>
        <DialogContent>
          <Box>
            <CreateDeviceForm
              onSubmit={handleSubmit}
              // busy={isLoading}
              open={open}
              setOpen={setOpen}
              listImages={listImages}
              setListImages={setListImages}
              listFiles={listFiles}
              setListFiles={setListFiles}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateDevicePage;
