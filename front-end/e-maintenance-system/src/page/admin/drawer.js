import React from 'react';
import { useHistory } from 'react-router';
import { Divider, List, ListItem } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const adminFeatures = [
  {
    text: 'Quản lý cửa hàng',
    value: 'ManagerShop',
    icon: '',
  },
];

const staffFeatures = [
  {
    text: 'Danh sách đơn',
    value: 'ManagerOrder',
    icon: '',
  },
];

const userFeatures = [
  { text: 'Quản lý đơn đặt hàng', value: 'UserOrder', icon: '' },
  {
    text: 'Cập nhật thông tin',
    value: 'UpdateInfo',
    icon: '',
  },
  {
    text: 'Đổi mật khẩu',
    value: 'ChangePassword',
    icon: '',
  },
  // {
  //   text: 'Đăng xuất',
  //   value: 'LogOut',
  //   icon: '',
  // },
];

const Features = (props) => {
  const history = useHistory();
  const { setPage, role } = props;

  return (
    <div>
      <KeyboardBackspaceIcon onClick={() => history.push('/')} />
      {role.includes('admin') && (
        <>
          <List>
            {adminFeatures.map(({ text, value }, index) => (
              <ListItem button key={text} onClick={() => setPage(value)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
      )}
      {role.includes('staff') && (
        <>
          <List>
            {staffFeatures.map(({ text, value }, index) => (
              <ListItem button key={text} onClick={() => setPage(value)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
      )}
      <List>
        {userFeatures.map(({ text, value }, index) => (
          <ListItem button key={text} onClick={() => setPage(value)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Features;
