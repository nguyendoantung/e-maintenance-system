import React from "react";
import {
    Box,
    DialogActions,
    CircularProgress,
    Button,
    TextField,
    makeStyles,
    Typography,
    MenuItem,
    FormHelperText,
} from "@material-ui/core";
import GetCategory from "../../../../../request/getCategory";
import ld from "lodash";
import { useCreateDeviceValidator } from "./CreateDeviceFormSchema";
import { useForm } from "react-hook-form";
import ListImage from "./components/ListImage";

export const CREATE_DEVICE_FORM = "CREATE_DEVICE_FORM";

const useStyles = makeStyles((theme) => ({
    inputText: {
        marginTop: "2%",
    },
}));

const CreateDeviceForm = ({ onSubmit, open, setOpen, busy }) => {
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
    }, [reset]);

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
    const onError = (err) => {
        console.log(err, watch("imageDevice"));
    };
    return (
        <>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <TextField
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
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
                    error={!!errors.category}
                    helperText={errors.category?.message}
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
                    {isLoadingCategory && (
                        <MenuItem>
                            <CircularProgress />
                        </MenuItem>
                    )}
                </TextField>
                <TextField
                    {...register("price")}
                    error={!!errors.price}
                    helperText={errors.price?.message}
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
                    error={!!errors.unit}
                    helperText={errors.unit?.message}
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
                {errors.imageDevice && (
                    <FormHelperText>
                        {errors.imageDevice?.message}
                    </FormHelperText>
                )}
                <DialogActions>
                    <Button
                        disabled={busy}
                        onClick={() => {
                            setOpen(false);
                            reset();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={busy}
                        endIcon={busy ? <CircularProgress /> : <span />}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Box>
        </>
    );
};

export default CreateDeviceForm;
