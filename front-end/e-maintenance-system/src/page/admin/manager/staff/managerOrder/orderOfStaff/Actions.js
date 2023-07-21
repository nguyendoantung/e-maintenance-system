import React from 'react';
import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  CircularProgress,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import ConfirmDialog from '../../../../../../components/ConfirmDialog';
import { showSuccess, showError } from '../../../../../../utils/notification';
import CompleteOrder from '../../../../../../request/completeOrder';
import AddDeviceOrder from '../../../../../../request/addDevice';
import AddDeviceOrderForm from './AddDeviceForm';

const OrderOfStaffAction = (props) => {
  const { order } = props;
  const [openAddDevice, setOpenAddDevice] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const { mutateAsync: asyncCompleteOrder, isLoading: isLoadingCompleteOrder } =
    CompleteOrder({ orderID: order?.id });

  const {
    mutateAsync: asyncAddDeviceOrder,
    isLoading: isLoadingAddDeviceOrder,
  } = AddDeviceOrder({ orderID: order?.id });

  const handleCompleteOrder = () => {
    asyncCompleteOrder()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleAddDeviceOrder = (formValues) => {
    const { device, number } = formValues;
    const body = { device_id: device, number };
    asyncAddDeviceOrder(body)
      .then((res) => {
        // console.log(res);
        showSuccess({ message: res?.data?.msg || 'Thêm thiết bị thành công!' });
        setOpenAddDevice(false);
      })
      .catch((err) => {
        showError({
          message:
            err.response?.data?.message ||
            'Không thể thêm thiết bị vào đơn, vui lòng thử lại sau.',
        });
        setOpenAddDevice(false);
      });
  };

  const handleClick = (event) => setAnchorEl(event?.currentTarget);

  return (
    <>
      <IconButton onClick={handleClick} size="small" data-testid="toggle">
        <MoreVert />
      </IconButton>
      <Menu
        id="group-action-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          // disabled={Boolean(order?.staff_name)}
          onClick={() => setOpenAddDevice(true)}
        >
          <ListItemText>Thêm thiết bị</ListItemText>
          <ListItemSecondaryAction>
            {isLoadingAddDeviceOrder && <CircularProgress size={20} />}
          </ListItemSecondaryAction>
        </MenuItem>
        {openAddDevice && (
          <AddDeviceOrderForm
            onSubmit={(data) => {
              handleAddDeviceOrder(data);
            }}
            onCancel={() => {
              if (!isLoadingAddDeviceOrder) {
                setOpenAddDevice(false);
              }
            }}
            busy={isLoadingAddDeviceOrder}
            order={order}
          />
        )}
        <MenuItem>
          <ListItemText onClick={handleCompleteOrder}>Hoàn thành</ListItemText>
          <ListItemSecondaryAction>
            {isLoadingCompleteOrder && <CircularProgress size={20} />}
          </ListItemSecondaryAction>
        </MenuItem>
      </Menu>
    </>
  );
};

export default OrderOfStaffAction;
