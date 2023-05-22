import React, { useEffect, useMemo, useState } from "react";
import { compose } from "redux";
import { useQuery } from "react-query";
import GetStaff from "../../../../../request/getStaff";
import {
  withPaginate,
  usePagination,
} from "../../../../../components/context/PaginateContext";
import SimpleTable from "../../../../../components/SimpleTable";
import columns from "./columns";
import { Card, Box, Button, Typography } from "@material-ui/core";

const StaffPage = () => {
  const { page, pageSize } = usePagination();

  const { data, refetch, isLoading, error, isSuccess } = GetStaff({
    page,
    pageSize,
  });
  const { user: listStaffs = [], total } = data?.data || {};
  const table = useMemo(
    () => (
      <SimpleTable
        columns={columns()}
        data={listStaffs}
        error={error}
        loading={isLoading}
        total={total}
        isSuccess={isSuccess}
      />
    ),
    [listStaffs, page, pageSize]
  );

  const renderContent = () => {
    if (listStaffs.length === 0 && !isLoading) {
      return <Typography>This empty here</Typography>;
    }
    return (
      <>
        <Card>
          <Box mb={2} pt={2} pr={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary">
              Thêm nhân viên
            </Button>
          </Box>
          {table}
        </Card>
      </>
    );
  };
  return <>{renderContent()}</>;
};

export default compose(withPaginate)(StaffPage);
