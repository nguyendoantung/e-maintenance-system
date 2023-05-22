import React, { useMemo } from "react";
import { compose } from "redux";

import GetDevice from "../../../../../request/getDevice";
import GetCategory from "../../../../../request/getCategory";
import {
  withPaginate,
  usePagination,
} from "../../../../../components/context/PaginateContext";
import SimpleTable from "../../../../../components/SimpleTable";
import { makeStyles } from "@material-ui/core/styles";
import columns from "./columns";
import ld from "lodash";
import {
  Card,
  Button,
  Box,
  FormControl,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    paddingRight: "5px",
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DevicePage = () => {
  const classes = useStyles();
  const { page, pageSize } = usePagination();
  const [chosenCategory, setChosenCategory] = React.useState("");
  // const [catego/]
  const { data: dataCategory, isLoading: isLoadingCategory } = GetCategory();

  const {
    data: dataDevices,
    refetch,
    isLoading: isLoadingDevices,
    error: errorDevices,
    isSuccess: isSuccessDevices,
  } = GetDevice({
    category: chosenCategory,
    page,
    pageSize,
  });
  const { device: listDevices = [], total } = dataDevices?.data || {};
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

  const table = useMemo(
    () => (
      <SimpleTable
        columns={columns()}
        data={listDevices}
        error={errorDevices}
        loading={isLoadingDevices}
        total={total}
        isSuccess={isSuccessDevices}
      />
    ),
    [listDevices, page, pageSize]
  );
  const onChangeCategory = (event) => {
    setChosenCategory(event.target.value);
  };
  const clearFilterCategory = () => {
    setChosenCategory("");
  };
  const renderContent = () => {
    return (
      <>
        <Card>
          <Box mb={2} pt={2} pr={2} display="flex" justifyContent="flex-end">
            <FormControl className={classes.formControl}>
              <InputLabel id="simple-select-label">Loại</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={chosenCategory}
                onChange={onChangeCategory}
              >
                {categories?.map(({ value, label }) => {
                  return (
                    <MenuItem value={value} key={1}>
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button>
              <DeleteIcon onClick={clearFilterCategory} />
            </Button>
            <Button variant="contained" color="primary">
              Thêm thiết bị
            </Button>
          </Box>
          {table}
        </Card>
      </>
    );
  };
  return <>{renderContent()}</>;
};

export default compose(withPaginate)(DevicePage);
