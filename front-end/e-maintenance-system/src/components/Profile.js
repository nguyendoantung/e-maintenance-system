import React from 'react';
import { useHistory } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import rootApi from '../api/rootApi';
import path from '../api/path';
import { Avatar, Typography, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import parseJwt from '../utils/parseJwt';

function Profile({ setToken, token }) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { data } = useQuery(
    ['get data', token],
    () => rootApi.get(path.auth.profile),
    {
      refetchInterval: 5000,
      onError(err) {
        if (err?.request?.status === 401) {
          setToken(null);
          localStorage.clear();
        }
      },
    }
  );

  const { mutateAsync } = useMutation(['logout', token], () => {
    return rootApi.post(path.auth.logout);
  });

  const [profileData, setProfileData] = React.useState({});
  React.useEffect(() => {
    setProfileData(data?.data);
  }, [data, token]);

  const userId = parseJwt(token)?.sub?.id || '';

  const logout = () => {
    mutateAsync().then(() => {
      setToken(null);
      localStorage.clear();
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <>
    //   <Avatar src={profileData?.profile_link}/>
    // </>
    <div className="Profile">
      {profileData && (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Typography
              style={{
                textSize: '16px',
              }}
            >
              {profileData.name}
            </Typography>
            <ArrowDropDownIcon
              style={{
                fontSize: '1rem',
              }}
              onClick={handleClick}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => history.push(`${userId}/admin`)}>
                Quản lý
              </MenuItem>
              <MenuItem onClick={logout}>Đăng xuất</MenuItem>
            </Menu>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
