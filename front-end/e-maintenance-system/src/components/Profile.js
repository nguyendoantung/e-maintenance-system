import React from "react";
import { useHistory } from "react-router";
import { useQuery, useMutation } from "react-query";
import path from "../api/path";
import { Avatar, Button, Typography, Menu, MenuItem } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import parseJwt from "../utils/parseJwt";
import rootApiHaveToken from "../api/rootApiHaveToken";

function Profile({ setToken, token }) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { data } = useQuery({
        queryKey: ["get data", token],
        queryFn: () =>
            rootApiHaveToken.request({
                url: path.auth.profile,
                method: "GET",
            }),
        refetchInterval: 5000,
        onError(err) {
            if (err?.request?.status === 401) {
                setToken(null);
                localStorage.clear();
            }
        },
    });

    const { mutateAsync } = useMutation(["logout", token], () => {
        return rootApiHaveToken.request({
            method: "POST",
            url: path.auth.logout,
        });
    });
    // console.log(queryProfile);
    // const { data } = queryProfile;
    const [profileData, setProfileData] = React.useState({});
    React.useEffect(() => {
        setProfileData(data);
    }, [data, token]);

    const userId = parseJwt(token)?.sub?.id || "";

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
        <>
            <Button onClick={handleClick}>
                <Avatar src={profileData?.profile_link} />
                <Typography
                    variant="h7"
                    style={{ color: "black", margin: "5px" }}
                >
                    {profileData?.name}
                </Typography>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={() => history.push(`${userId}/admin`)}>
                    Quản lý
                </MenuItem>
                <MenuItem onClick={logout}>Đăng xuất</MenuItem>
            </Menu>
        </>
    );
}

export default Profile;
