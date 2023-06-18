import React from "react";
import preventive_maintenance from "../../image/preventive-maintenance.jpg";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    CardActions,
    Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import KitchenIcon from "@material-ui/icons/Kitchen";
import FridgeIcon from ".././../icon_image/fridge.png";
import WasherIcon from ".././../icon_image/washer.png";
import AirIcon from ".././../icon_image/air_conditioning.png";
import ElectricIcon from ".././../icon_image/broken-cable.png";

import PowerIcon from "@material-ui/icons/Power";

const repairTypes = [
    {
        text: "Sửa tủ lạnh",
        icon: () => (
            <img
                src={FridgeIcon}
                alt="icon fridge"
                style={{
                    maxWidth: "70px",
                    height: "70px",
                    objectFit: "cover",
                }}
            />
        ),
    },
    {
        text: "Sửa chữa máy giặt",
        icon: () => (
            <img
                src={WasherIcon}
                alt="icon washer"
                style={{
                    maxWidth: "70px",
                    height: "70px",
                    objectFit: "cover",
                }}
            />
        ),
    },
    {
        text: "Sửa điều hòa",
        icon: () => (
            <img
                src={AirIcon}
                alt="icon air"
                style={{
                    maxWidth: "70px",
                    height: "70px",
                    objectFit: "cover",
                }}
            />
        ),
    },
    {
        text: "Sửa điện",
        icon: () => (
            <img
                src={ElectricIcon}
                alt="icon power"
                style={{
                    maxWidth: "70px",
                    height: "70px",
                    objectFit: "cover",
                }}
            />
        ),
    },
];

const MainContent = () => {
    return (
        <>
            <img
                src={preventive_maintenance}
                alt="preventive and maintenance"
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                }}
            />
            {/* <Grid container spacing={1}> */}
            {/* <Grid item xs={12} sx={{ border: 0 }}> */}
            <Grid
                container
                justifyContent="center"
                // spacing={2}
                style={{
                    paddingRight: "2%",
                }}
            >
                {repairTypes.map((repairType, index) => {
                    return (
                        <Grid
                            key={repairType?.text}
                            item
                            xs={3}
                            // sx={{ border: 0 }}
                            style={{
                                paddingLeft: "2%",
                            }}
                        >
                            <Card
                                variant="outlined"
                                style={{
                                    border: "1px solid #ced4da",
                                    padding: "8%",
                                }}
                            >
                                <Box
                                    component={"div"}
                                    style={{
                                        display: "inline-flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <repairType.icon />

                                    <Typography
                                        style={{
                                            fontFamily: "cursive",
                                            fontSize: 22,
                                            color: "#495057",
                                        }}
                                    >
                                        0{index + 1}
                                    </Typography>
                                </Box>
                                <CardContent
                                    style={{
                                        paddingInline: 0,
                                    }}
                                >
                                    <Typography
                                        style={{
                                            color: "#495057",
                                            fontWeight: "normal",
                                            fontFamily: "sans-serif",
                                            fontSize: 24,
                                            display: "-webkit-box",
                                            overflow: "hidden",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 1,
                                        }}
                                    >
                                        {repairType?.text}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    style={{
                                        paddingInline: 0,
                                        paddingBottom: "2%",
                                    }}
                                >
                                    <Button
                                        variant="filled"
                                        size="medium"
                                        style={{
                                            background: "#339FD9",
                                            color: "white",
                                            fontWeight: "500",
                                            fontSize: "110%",
                                            boxShadow: "0px 0px 0px 0px",
                                            borderRadius: "8px",
                                            textTransform: "none",
                                            paddingInline: "16%",
                                            paddingBlock: "4%",
                                        }}
                                        // component={Link}
                                    >
                                        Đặt dịch vụ
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            {/* </Grid> */}
            {/* </Grid> */}

            <Typography>
                <div></div>
            </Typography>
        </>
    );
};

export default MainContent;
