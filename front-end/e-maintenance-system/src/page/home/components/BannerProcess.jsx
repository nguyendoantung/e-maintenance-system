import { Box, Typography } from "@material-ui/core";
import React from "react";
import banner5_img from "../../../image/banner5.jpeg";

export default function BannerProcess() {
    const Data = [
        {
            title: "DAMAGE DEVICE",
            content: "Khi thiết bị hoặc căn nhà của bạn xảy ra sự cố hỏng hóc",
        },
        {
            title: "SEND THEM TO US",
            content: "Gửi yêu cầu sủa chữa đến chúng tôi, kèm theo thông tin",
        },
        {
            title: "FAST FIX",
            content: "Chúng tôi sẽ sủa chúng một cách nhanh chóng",
        },
        {
            title: "QUICK RETURN",
            content: "Và trả lại cho bạn nhanh nhất có thể",
        },
    ];
    return (
        <div
            style={{
                width: "100%",
                height: "55vh",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    backgroundImage: `url('${banner5_img}')`,
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    zIndex: 2,
                    backgroundColor: "rgba(0,0,0, 0.7)",
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                }}
            >
                <Typography
                    style={{
                        fontSize: 30,
                        color: "#fff",
                        fontWeight: "bold",
                    }}
                >
                    Quy trình của chúng tôi
                </Typography>

                <Typography
                    style={{
                        fontSize: 17,
                        color: "white",
                        fontWeight: "500",
                        maxWidth: "27vw",
                        paddingTop: "1%",
                        paddingBottom: "3%",
                    }}
                >
                    Easy and effective way to get your device repaired
                </Typography>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                        paddingInline: "10%",
                    }}
                >
                    {Data.map((item, index) => {
                        return (
                            <Box
                                style={{
                                    maxWidth: "25%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        variant="h2"
                                        style={{
                                            color: "#2b9348",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {index + 1}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        style={{
                                            color: "#fff",
                                            maxWidth: "45%",
                                            paddingLeft: "5%",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="body2"
                                    style={{
                                        color: "#fff",
                                    }}
                                >
                                    {item.content}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </div>
    );
}
