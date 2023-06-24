import React from 'react';
import { useMutation } from 'react-query';
import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  CircularProgress,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { showSuccess, showError } from '../../../../utils/notification';
import RejectOrderForm from './rejectOrderForm';
import rootApi from '../../../../api/rootApi';
import path from '../../../../api/path';

const OrderAction = (props) => {
  const { order } = props;
  const orderId = order?.id;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openReject, setOpenReject] = React.useState(false);
  const [openAssign, setOpenAssign] = React.useState(false);

  const { mutateAsync: asyncRejectOrder, isLoading: isLoadingRejectOrder } =
    useMutation(['reject-order', orderId], (formValues) => {
      const { reason } = formValues;
      const body = { reason };
      return rootApi.put(path.admin.order.rejectOrder({ orderId }), body);
    });

  const handleRejectOrder = (formValues) => {
    asyncRejectOrder(formValues)
      .then((res) => {
        showSuccess({ message: res?.data?.message || 'Success' });
      })
      .catch((errors) => {
        showError({ message: errors?.response?.data?.message || 'Fail' });
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
          disabled={Boolean(order?.staff_name)}
          onClick={() => setOpenReject(true)}
        >
          <ListItemText>Từ chối</ListItemText>
        </MenuItem>
        {openReject && (
          <RejectOrderForm
            onSubmit={handleRejectOrder}
            onCancel={() => setOpenReject(false)}
            order={order}
          />
        )}
        <MenuItem disabled={Boolean(order?.staff_name)}>
          <ListItemText>Giao việc</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default OrderAction;
