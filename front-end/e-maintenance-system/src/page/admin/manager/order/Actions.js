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
import AssignOrderForm from './assignOrderForm';
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

  const { mutateAsync: asyncAssign, isLoading: isLoadingAssign } = useMutation(
    ['assgin-order', orderId],
    (formValues) => {
      const { reason } = formValues;
      const body = { reason };
      return rootApi.put(path.admin.order.assignOrder({ orderId }), body);
    }
  );

  const handleRejectOrder = (formValues) => {
    asyncRejectOrder(formValues)
      .then((res) => {
        setOpenReject(false);
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
          disabled={
            Boolean(order?.staff_name) || Boolean(order?.status === 'Rejected')
          }
          onClick={() => setOpenReject(true)}
        >
          <ListItemText>Từ chối</ListItemText>
          <ListItemSecondaryAction>
            {isLoadingRejectOrder && <CircularProgress size={20} />}
          </ListItemSecondaryAction>
        </MenuItem>
        {openReject && (
          <RejectOrderForm
            onSubmit={handleRejectOrder}
            onCancel={() => setOpenReject(false)}
            busy={isLoadingRejectOrder}
            order={order}
          />
        )}
        <MenuItem
          disabled={Boolean(order?.staff_name)}
          onClick={() => setOpenAssign(true)}
        >
          <ListItemText>Giao việc</ListItemText>
        </MenuItem>
        {openAssign && <AssignOrderForm order={order} />}
      </Menu>
    </>
  );
};

export default OrderAction;
