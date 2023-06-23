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
import { showSuccess, showError } from '../../../../utils/notification';

const OrderAction = (props) => {
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
        <MenuItem disabled={Boolean(order?.staff_name)}>
          <ListItemText>Từ chối</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Giao việc</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default OrderAction;
