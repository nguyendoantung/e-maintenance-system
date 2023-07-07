import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import banner4_img from "../../../image/banner4.jpeg";
import PhoneIcon from "@material-ui/icons/Phone";
import UpdateIcon from "@material-ui/icons/Update";

export default function BannerAd() {
    return (
        <Box
            sx={{
                justifyContent: "center",
                display: "flex",
                paddingY: "2%",
            }}
        >
            <Box
                style={{
                    width: "30%",
                    height: "60vh",
                    borderBottom: "5px solid #3a5a40",
                    marginRight: "2%",
                }}
            >
                <img
                    src={banner4_img}
                    alt="Banner4"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            </Box>

            <Box
                style={{
                    width: "40%",
                    height: "60vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Typography
                        variant="h1"
                        style={{
                            color: "#3a5a40",
                            fontWeight: "700",
                        }}
                    >
                        20+
                    </Typography>
                    <Typography
                        variant="h4"
                        style={{
                            fontFamily: 'Time New Roman',
                            color: "#333",
                            fontWeight: "500",
                            maxWidth: "100%",
                            padding: "1.5%",
                        }}
                    >
                        NHÂN VIÊN LUÔN LUÔN TRONG TRẠNG THÁI SẴN SÀNG
                    </Typography>
                </Box>
                <Typography
                    variant="body1"
                    style={{
                        color: "#6c757d",
                        fontWeight: "400",
                        maxWidth: "100%",
                    }}
                >
                    <>
                    <div>Với lực lượng nhân viên đông đảo, giàu kinh nghiệm, luôn túc trực
                    24h/7 ngày, sẵn sàng cho mọi nhu cầu sữa chữa của bạn.
                    {"\n\n"} Không còn lo lắng khi gặp tình trạng hỏng hóc, chúng tôi
                    luôn luôn bên bạn, là chỗ dựa tin cậy cho sự cuộc sống của bạn.</div>
                    <div>Nhanh chóng - Dễ dàng - Tiện lợi!</div>
                    </>
                </Typography>
                <Typography
                    variant="h5"
                    style={{
                        color: "#333",
                        fontWeight: "700",
                        maxWidth: "100%",
                        paddingBlock: "4%",
                    }}
                >
                    LUÔN ĐỒNG HÀNH CÙNG BẠN
                </Typography>
                <Box
                    style={{
                        bottom: 0,
                        marginTop: "auto",
                        marginBottom: "5%",
                    }}
                >
                    <Button
                        variant="contained"
                        size="medium"
                        style={{
                            backgroundColor: "#3a5a40",
                            border: "2px solid #3a5a40",
                            color: "white",
                            fontWeight: "500",
                            fontSize: 16,
                            borderRadius: "100px",
                            textTransform: "none",
                            paddingInline: "2%",
                            paddingBlock: "1%",
                            minWidth: "20%",
                            marginRight: "2%",
                        }}
                        startIcon={<PhoneIcon />}
                        // component={Link}
                    >
                        Liên hệ
                    </Button>
                    <Button
                        variant="outlined"
                        size="medium"
                        style={{
                            color: "#3a5a40",
                            fontWeight: "500",
                            fontSize: 16,
                            borderRadius: "100px",
                            border: "2px solid #3a5a40",
                            textTransform: "none",
                            paddingInline: "2%",
                            paddingBlock: "1%",
                            minWidth: "20%",
                        }}
                        endIcon={<UpdateIcon />}
                        // component={Link}
                    >
                        Phục vụ 24/7
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
