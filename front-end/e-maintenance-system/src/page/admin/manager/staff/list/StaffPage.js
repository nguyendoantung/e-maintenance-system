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
import { Card, Typography } from "@material-ui/core";

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
        <Card>{table}</Card>
      </>
    );
  };
  return <>{renderContent()}</>;
};

export default compose(withPaginate)(StaffPage);
