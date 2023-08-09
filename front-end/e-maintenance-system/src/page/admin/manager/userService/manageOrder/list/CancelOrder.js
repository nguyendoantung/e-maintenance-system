import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOrder from '../../../../../../request/deleteOrder';
import { showSuccess, showError } from '../../../../../../utils/notification';

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

const CancelOrderButton = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { order } = props;

  const { mutateAsync, isLoading } = DeleteOrder({ orderId: order?.id });
  return (
    <>
      <Button>
        <DeleteIcon style={{ color: 'red' }} onClick={() => setOpen(true)} />
      </Button>
      {open && (
        <>
          <Dialog onClose={() => setOpen(false)} open maxWidth="md">
            <DialogContent className={classes.dialogTitle}>
              Hủy đơn
            </DialogContent>
            <DialogContent>
              Bạn có muốn hủy đơn <strong>{order?.full_name}</strong>?<br />
              Hành động này sẽ không thể quay lại.
            </DialogContent>
            <DialogActions color="primary" variant="contained">
              <Button onClick={() => setOpen(false)}>Quay lại</Button>
              <Button
                onClick={() =>
                  mutateAsync()
                    .then((res) => {
                      setOpen(false);
                      showSuccess({
                        message: res?.data?.data?.msg || 'Hủy đơn thành công!',
                      });
                    })
                    .catch((error) => {
                      showError({
                        message: error.response?.data?.msg || 'Thất bại!',
                      });
                    })
                }
              >
                Hủy đơn
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default CancelOrderButton;
