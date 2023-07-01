import React from "react";
import preventive_maintenance from "../../image/preventive-maintenance.jpg";
import banner_img from "../../image/banner.jpeg";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    CardActions,
    Button,
    Link as MuiLink,
    ImageListItem,
    ImageListItemBar,
    ImageList,
    IconButton,
    Divider,
    Tooltip,
    ListSubheader,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { Link, useHistory } from "react-router-dom";
import KitchenIcon from "@material-ui/icons/Kitchen";
import FridgeIcon from ".././../icon_image/fridge.png";
import WasherIcon from ".././../icon_image/washer.png";
import AirIcon from ".././../icon_image/air_conditioning.png";
import ElectricIcon from ".././../icon_image/broken-cable.png";
import TimeIcon from "../../icon_image/clock.png";
import SupportIcon from "../../icon_image/support.png";
import ServiceIcon from "../../icon_image/service.png";

import GetCategory from "../../request/getCategory";
import GetDevice from "../../request/getDevice";
import ld from "lodash";

import PowerIcon from "@material-ui/icons/Power";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        flexWrap: "nowrap",
        transform: "translateZ(0)",
    },
    title: {
        // color: theme.palette.primary.light,
        color: "green",
    },
    titleBar: {
        background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
}));

const ListDevice = (props) => {
    const classes = useStyles();
    const { categoryId, categoryName } = props;
    const [pageSize, setPageSize] = React.useState(1000);
    const { data: dataDevice } = GetDevice({
        category: categoryId,
        page: 1,
        pageSize: pageSize,
    });
    const devices = ld
        .chain(dataDevice?.data?.device ?? [])
        .map(({ id, name, image_link: imageLink, price }) => {
            return {
                value: id,
                label: name,
                imageLink,
                price,
            };
        })
        .orderBy("label")
        .value();

    return (
        <>
            {devices.length !== 0 && (
                <>
                    <Typography variant="h6">{categoryName}</Typography>
                    <div className={classes.root}>
                        <ImageList className={classes.imageList} cols={3}>
                            {/* <ImageListItem key="Subheader" cols={0} style={{ height: 'auto' }}> */}
                            {/* <ListSubheader component="div">{categoryName}</ListSubheader> */}
                            {/* </ImageListItem> */}
                            {devices.map((device, index) => {
                                return (
                                    <>
                                        <ImageListItem key={device?.id}>
                                            <Tooltip
                                                title={`${device?.label} ${device?.price}`}
                                                aria-label="add"
                                            >
                                                <img
                                                    style={{
                                                        height: "200px",
                                                        width: "200px",
                                                        maxWidth: "250px",
                                                        maxHeight: "250px",
                                                    }}
                                                    src={device.imageLink}
                                                    alt={device.name}
                                                />
                                            </Tooltip>
                                            <ImageListItemBar
                                                title={device?.label}
                                                subtitle={
                                                    <span>{device?.price}</span>
                                                }
                                            />
                                        </ImageListItem>
                                        <Typography
                                            style={{ paddingLeft: "1px" }}
                                        ></Typography>
                                    </>
                                );
                            })}
                        </ImageList>
                    </div>
                </>
            )}
        </>
    );
};

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

const HomePage = () => {
    const history = useHistory();
    const { data: dataCategory } = GetCategory();
    const categories = ld
        .chain(dataCategory?.data?.data ?? [])
        .map(({ id, name }) => {
            return {
                value: id,
                label: name,
            };
        })
        .orderBy("label")
        .value();
    const STORE_INFO = [
        {
            title: "Mở cửa từ thứ 2 đến thứ 6",
            content: "MON-FRI: 8:00 - 18:00",
            icon: TimeIcon,
        },
        {
            title: "Thắc mắc? Liên hệ ngay",
            content: "+84 973416158",
            icon: SupportIcon,
        },
        {
            title: "Chất lượng phục vụ",
            content: "Nhanh chóng, tốt nhất",
            icon: ServiceIcon,
        },
    ];
    return (
        <>
            <div
                style={{
                    width: "100%",
                    height: "50vh",
                    justifyContent: "space-around",
                }}
            >
                <Box
                    sx={{
                        backgroundImage: `url('${banner_img}')`,
                        width: "100%",
                        objectFit: "cover",
                        height: "100%",
                        backgroundSize: "100%",
                        // display: "flex",
                        justifyContent: "center",
                        // flexDirection: "column",
                    }}
                >
                    <Typography
                        style={{
                            fontSize: 24,
                            color: "white",
                            fontWeight: "700",
                        }}
                    >
                        TÌM KIẾM
                    </Typography>
                    <Typography
                        style={{
                            fontSize: 24,
                            color: "white",
                            fontWeight: "700",
                        }}
                    >
                        DỊCH VỤ SỬA CHỮA
                    </Typography>
                    <Button
                        variant="contained"
                        size="medium"
                        style={{
                            background: "#3a5a40",
                            color: "white",
                            fontWeight: "500",
                            fontSize: 16,
                            // boxShadow: "0px 0px 0px 0px",
                            borderRadius: "6px",
                            textTransform: "none",
                            paddingInline: "2%",
                            paddingBlock: "1%",
                        }}
                        // component={Link}
                    >
                        Khám phá ngay
                    </Button>
                </Box>
            </div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    backgroundColor: "white",
                    paddingBlock: "20px",
                }}
            >
                {STORE_INFO.map((item, index) => {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <img
                                src={item.icon}
                                alt={item.title}
                                style={{
                                    maxWidth: "48px",
                                    height: "48px",
                                    objectFit: "cover",
                                    marginInline: "10px",
                                }}
                            />
                            <Box>
                                <Typography
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "500",
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "700",
                                    }}
                                >
                                    {item.content}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <Typography
                variant="h4"
                style={{
                    fontWeight: "500",
                    padding: "2%",
                    textAlign: "center",
                }}
            >
                Làm việc hiệu quả và chuyên nghiệp
            </Typography>
            <Grid
                container
                justifyContent="center"
                style={{
                    paddingRight: "2%",
                    // paddingBottom: 100,
                }}
            >
                {repairTypes.map((repairType, index) => {
                    return (
                        <Grid
                            key={repairType?.text}
                            item
                            xs={3}
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
                                        variant="h5"
                                        style={{
                                            color: "#495057",
                                            fontWeight: "normal",
                                            fontFamily: "sans-serif",
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
                                        variant="contained"
                                        size="medium"
                                        style={{
                                            background: "#3a5a40",
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
            <Typography
                variant="h6"
                style={{
                    fontWeight: "500",
                    padding: "2%",
                    textAlign: "center",
                }}
                onClick={() => history.push("/service")}
            >
                Chi tiết về dịch vụ của chúng tôi
            </Typography>
            {/* <Typography>Danh sách thiết bị</Typography> */}

            <Typography
                variant="h4"
                style={{
                    fontWeight: "500",
                    // padding: '2%',
                    textAlign: "center",
                }}
            >
                Kho thiết bị
            </Typography>
            <Typography
                style={{
                    fontWeight: "500",
                    padding: "2%",
                    textAlign: "center",
                }}
            >
                {categories.map(({ value, label }, index) => {
                    return (
                        <div>
                            <ListDevice
                                categoryId={value}
                                categoryName={label}
                            />
                        </div>
                    );
                })}
            </Typography>
        </>
    );
};

export default HomePage;
