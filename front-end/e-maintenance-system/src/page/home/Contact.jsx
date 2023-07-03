import React from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Box, Typography } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import IconInfor from "../../components/IconInfor";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";

const Contact = () => {
    return (
        <>
            <Typography variant="h6" style={{ textAlign: "center" }}>
                Liên hệ
            </Typography>
            <Box>
                <IconInfor placement="top">
                    <LocationOnIcon fontSize="small" htmlColor="#fff" />
                </IconInfor>
                <Typography variant="button">Ngách 376/22B .....</Typography>
            </Box>
            <Box>
                <IconInfor placement="top">
                    <CallIcon fontSize="small" htmlColor="#fff" />
                </IconInfor>
                <Typography variant="button">0398825368</Typography>
            </Box>
            <Box>
                <IconInfor placement="top">
                    <EmailOutlinedIcon fontSize="small" htmlColor="#fff" />
                </IconInfor>
                <Typography variant="button">
                    tung.nd173451@sis.hust.edu.vn
                </Typography>
            </Box>
            <Box>
                <IconInfor placement="top">
                    <QueryBuilderOutlinedIcon
                        fontSize="small"
                        htmlColor="#fff"
                    />
                </IconInfor>
                <Typography variant="button">T2 - CN 7h30 - 21h00</Typography>
            </Box>
        </>
    );
};

export default Contact;
