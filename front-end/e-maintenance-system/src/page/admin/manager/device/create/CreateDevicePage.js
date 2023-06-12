import React from 'react';
import CreateDeviceForm from './CreateDeviceForm';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Dialog, DialogTitle, DialogContent } from '@material-ui/core';

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
  const classes = useStyles()
  const handleSubmit = (formValues) => {
    console.log(formValues);
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
              // token={token}
              onSubmit={handleSubmit}
              // busy={isLoading}
              open={open}
              setOpen={setOpen}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateDevicePage;
