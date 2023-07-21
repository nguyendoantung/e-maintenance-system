import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Box,
  makeStyles,
  TextField,
  MenuItem,
} from '@material-ui/core';
import ld from 'lodash';
import { useForm } from 'react-hook-form';
import { useAddDeviceOrderValidator } from './AddDeviceFormValidator';
import GetAllDevice from '../../../../../../request/getAllDevice';

export const ADD_REJECT_FORM = 'ADD_REJECT_FORM';

const useStyles = makeStyles((theme) => ({
  inputText: {
    marginTop: '2%',
  },
}));
const AddDeviceOrderForm = (props) => {
  const { order, onSubmit, onCancel, busy } = props;
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: useAddDeviceOrderValidator(),
  });

  const { data, isLoading } = GetAllDevice();
  const devices = ld
    .chain(data?.data?.device ?? [])
    .map(({ id, name, price }) => {
      return {
        value: id,
        label: `${name} - Đơn giá: ${price}`,
      };
    })
    .orderBy('label')
    .value();

  return (
    <>
      <Dialog onClose={onCancel} open>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            Thêm thiết bị cho đơn <strong>{order?.full_name}</strong>
          </DialogTitle>
          <DialogContent>
            <Typography>
              Để đảm bảo khách hàng có thể theo dõi quá trình thêm thiết bị tốt
              hơn, vui lòng thêm lần lượt từng thiết bị
            </Typography>
            <TextField
              {...register('device')}
              error={!!errors.device}
              helperText={errors.device?.message}
              variant="outlined"
              name="device"
              id="device"
              label="Thiết bị thêm"
              required
              fullWidth
              value={watch('device')}
              select
              className={classes.inputText}
            >
              {devices.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}

              {isLoading && (
                <MenuItem>
                  <Typography>Loading</Typography>
                </MenuItem>
              )}
            </TextField>
            <TextField
              {...register('number')}
              error={!!errors.number}
              helperText={errors.number?.message}
              variant="outlined"
              name="number"
              id="number"
              label="Số lượng"
              required
              fullWidth
              value={watch('number')}
              type="number"
              className={classes.inputText}
            />
            <DialogActions>
              <Button
                disabled={busy}
                onClick={() => {
                  onCancel();
                  reset();
                }}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={busy}
                endIcon={busy ? <CircularProgress /> : <span />}
              >
                Xác nhận
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default AddDeviceOrderForm;
