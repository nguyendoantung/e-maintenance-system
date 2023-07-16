import React from "react";
import {
    Button,
    DialogActions,
    CircularProgress,
    Box,
    TextField,
    makeStyles,
    MenuItem,
    Typography,
} from "@material-ui/core";
import ld from "lodash";
import GetCategory from "../../../../../request/getCategory";
import { useCreateOrderValidator } from "./CreateOrderSchema";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    inputText: {
        marginTop: "2%",
    },
}));
const CreateRepairOrderForm = (props) => {
    const { onSubmit, setOpen, busy, onCancelCreatePage } = props;
    const classes = useStyles();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: useCreateOrderValidator(),
    });

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
    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    variant="outlined"
                    name="name"
                    id="name"
                    label="Tên đơn"
                    required
                    fullWidth
                    value={watch("name")}
                    autoFocus
                    className={classes.inputText}
                />
                <TextField
                    {...register("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    variant="outlined"
                    name="phone"
                    id="phone"
                    label="Số điện thoại"
                    required
                    fullWidth
                    value={watch("phone")}
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
                    label="Loại sửa chữa"
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
                            <Typography>Loading</Typography>
                        </MenuItem>
                    )}
                </TextField>
                <TextField
                    {...register("location")}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                    variant="outlined"
                    name="location"
                    id="location"
                    label="Địa chỉ"
                    required
                    fullWidth
                    value={watch("location")}
                    autoFocus
                    className={classes.inputText}
                />
                <TextField
                    {...register("device")}
                    error={!!errors.device}
                    helperText={errors.device?.message}
                    variant="outlined"
                    name="device"
                    id="device"
                    label="Thiết bị cần sửa chữa"
                    required
                    fullWidth
                    value={watch("device")}
                    autoFocus
                    className={classes.inputText}
                />
                <TextField
                    {...register("note")}
                    error={!!errors.note}
                    helperText={errors.note?.message}
                    variant="outlined"
                    name="note"
                    id="note"
                    label="Ghi chú"
                    // required
                    fullWidth
                    value={watch("note")}
                    autoFocus
                    className={classes.inputText}
                />

                <DialogActions>
                    <Button
                        disabled={busy}
                        onClick={() => {
                            setOpen(false);
                            reset();
                            if (onCancelCreatePage){
                                onCancelCreatePage()
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={busy}
                        endIcon={busy ? <CircularProgress /> : <span />}
                    >
                        Đặt
                    </Button>
                </DialogActions>
            </Box>
        </>
    );
};

export default CreateRepairOrderForm;
