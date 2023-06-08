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

const OrderOfStaffAction = (props) => {
  const { order } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

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
        // onClick={() => setAcceptOrder(true)}
        >
          <ListItemText>Thêm thiết bị</ListItemText>
          {/* <ListItemSecondaryAction>
            {isLoadingAcceptOrder && <CircularProgress size={20} />}
          </ListItemSecondaryAction> */}
        </MenuItem>
        <MenuItem>
          <ListItemText>Hoàn thành</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default OrderOfStaffAction;
