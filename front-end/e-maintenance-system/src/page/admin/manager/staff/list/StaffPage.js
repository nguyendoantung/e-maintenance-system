import React, { useEffect, useMemo, useState } from "react";
import { compose } from "redux";
import { useQuery } from "react-query";
import GetStaff from "../../../../../request/getStaff";
import {
  withPaginate,
  usePagination,
} from "../../../../../components/context/PaginateContext";

const StaffPage = () => {
  const { page, pageSize } = usePagination();
  const { data } = GetStaff({ page, pageSize });
  console.log(data);
  return <div>Staff list is here</div>;
};

export default compose(withPaginate)(StaffPage);
