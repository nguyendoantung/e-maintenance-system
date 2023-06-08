import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  Box,
  DialogTitle,
  Slide,
  Typography,
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide ref={ref} {...props} direction="up" />;
});

export default function ConfirmDialog(props) {
  const { onConfirm, onCancel, title, content, action, backgroundColor } =
    props;

  return (
    <Dialog
      onClose={onCancel}
      open
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography style={{ marginBottom: 10 }}>{content}</Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={() => {
              onCancel();
              onConfirm();
            }}
            style={{
              marginLeft: '2px',
              color: 'white',
              backgroundColor: backgroundColor || 'red',
            }}
            variant="contained"
          >
            {action}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
