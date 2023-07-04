import React from "react";
import {
    Box,
    ImageListItem,
    ImageList,
    DialogActions,
    CircularProgress,
    Button,
    TextField,
    makeStyles,
    Input,
    Typography,
    MenuItem,
} from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, reset, Form, change } from "redux-form";
import AsyncSelectField from "../../../../../components/FormControls/AsyncSelectField";
import GetCategory from "../../../../../request/getCategory";
import ld from "lodash";
import Joi from "joi";
import createValidator from "../../../../../components/createValidator";
import { useCreateDeviceValidator } from "./CreateDeviceFormSchema";
import { useForm } from "react-hook-form";
import ListImage from "./components/ListImage";

export const CREATE_DEVICE_FORM = "CREATE_DEVICE_FORM";

const useStyles = makeStyles((theme) => ({
    inputText: {
        marginTop: "2%",
    },
}));

const CreateDeviceForm = ({ onSubmit, open, setOpen }) => {
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: useCreateDeviceValidator(),
    });

    React.useEffect(() => {
        reset();
    }, []);

    const { data: dataCategory, isLoading: isLoadingCategory } = GetCategory();
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

    const removeChooseImage = (i) => {
        const s = [...watch("imageDevice")].filter(
            (item, index) => index !== i
        );
        setValue("imageDevice", s);
    };
    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("name")}
                    variant="outlined"
                    name="name"
                    id="name"
                    label="Tên thiết bị"
                    required
                    fullWidth
                    value={watch("name")}
                    autoFocus
                    className={classes.inputText}
                />
                <TextField
                    {...register("category")}
                    variant="outlined"
                    name="category"
                    id="category"
                    label="Loại"
                    required
                    fullWidth
                    value={watch("category")}
                    autoFocus
                    select
                    className={classes.inputText}
                >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    {...register("price")}
                    variant="outlined"
                    name="price"
                    id="price"
                    label="Giá"
                    required
                    fullWidth
                    value={watch("price")}
                    autoFocus
                    type="number"
                    className={classes.inputText}
                />
                <TextField
                    {...register("unit")}
                    variant="outlined"
                    name="unit"
                    id="unit"
                    label="Đơn vị"
                    required
                    fullWidth
                    value={watch("unit")}
                    autoFocus
                    className={classes.inputText}
                />

                <Button
                    variant="contained"
                    component="label"
                    className={classes.inputText}
                >
                    Upload File
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        {...register("imageDevice")}
                        id="imageDevice"
                        name="imageDevice"
                    />
                </Button>
                {watch("imageDevice") &&
                    [...watch("imageDevice")]?.map((item, index) => {
                        return (
                            <Typography key={index}>{item?.name}</Typography>
                        );
                    })}
                {watch("imageDevice")?.length > 0 && (
                    <ListImage
                        data={watch("imageDevice") ?? []}
                        removeImage={removeChooseImage}
                    />
                )}
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            reset();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Box>
        </>
    );
};

export default CreateDeviceForm;
