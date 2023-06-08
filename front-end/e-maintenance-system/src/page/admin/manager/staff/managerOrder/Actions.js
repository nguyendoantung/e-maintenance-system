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
import ConfirmDialog from '../../../../../components/ConfirmDialog';
import AcceptOrder from '../../../../../request/acceptOrder';
import { showSuccess, showError } from '../../../../../utils/notification';

const OrderAction = (props) => {
  const { order } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [acceptOrder, setAcceptOrder] = React.useState(false);
  const handleClick = (event) => setAnchorEl(event?.currentTarget);

  const { mutateAsync: acceptOrderAsync, isLoading: isLoadingAcceptOrder } =
    AcceptOrder({ orderId: order?.id });

  const onAcceptOrder = () => {
    acceptOrderAsync()
      .then((res) => {
        showSuccess({
          message: res?.data?.data?.message || 'Nhận đơn thành công!',
        });
        setAnchorEl(null);
      })
      .catch((error) => {
        showError(
          error.response?.data?.message || 'Thất bại, vui lòng thử lại sau'
        );
        setAnchorEl(null);
      });
  };

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
          disabled={Boolean(order?.staff_name)}
          onClick={() => setAcceptOrder(true)}
        >
          <ListItemText>Nhận đơn</ListItemText>
          <ListItemSecondaryAction>
            {isLoadingAcceptOrder && <CircularProgress size={20} />}
          </ListItemSecondaryAction>
        </MenuItem>
        {acceptOrder && (
          <ConfirmDialog
            onConfirm={onAcceptOrder}
            onCancel={() => setAcceptOrder(false)}
            title="Nhận đơn"
            content={<span>Xác nhận thực thi đơn này?</span>}
            action="Xác nhận"
            backgroundColor="#0052CC"
          />
        )}
      </Menu>
    </>
  );
};

export default OrderAction;
