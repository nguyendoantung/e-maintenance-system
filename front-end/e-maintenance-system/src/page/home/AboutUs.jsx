import React from "react";
import { Box, Typography } from "@material-ui/core";

const AboutUs = () => {
    return (
        <>
            <Typography
                variant="h6"
                gutterBottom
                style={{ textAlign: "center" }}
            >
                Về chúng tôi
            </Typography>
            <Box>
                <Typography>An toàn và tin cậy</Typography>
                <Typography>Dịch vụ sửa chữa uy tín hàng đầu</Typography>
            </Box>
        </>
    );
};

export default AboutUs;
