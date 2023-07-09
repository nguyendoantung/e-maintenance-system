import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import { compose } from 'redux';
import {
  withPaginate,
  usePagination,
} from '../../../../../../components/context/PaginateContext';
import SimpleTable from '../../../../../../components/SimpleTable';
import columns from './columns';
import GetAllOrder from '../../../../../../request/getAllOrder';
import { Card, Box, Button, Typography } from '@material-ui/core';
import CreateRepairOrderPage from '../../createRepairOrder/CreateRepairOrderPage';

const HistoryOrderPage = () => {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  // const [openRepair, setOpenRepair] = React.useState(false);
  const { adminID } = useParams();
  const { page, pageSize } = usePagination();
  const { data, refetch, isLoading, error, isSuccess } = GetAllOrder({
    adminID,
    page,
    pageSize,
  });
  const { data: listOrders = [], total } = data?.data || {};
  const table = useMemo(
    () => (
      <SimpleTable
        columns={columns()}
        data={listOrders}
        error={error}
        loading={isLoading}
        total={total}
        isSuccess={isSuccess}
      />
    ),
    [listOrders, page, pageSize]
  );
  const renderContent = () => {
    // if (listOrders.length === 0 && !isLoading) {
    //   return <Typography>This empty here</Typography>;
    // }
    return (
      <>
        <Card>{table}</Card>
      </>
    );
  };
  return <>{renderContent()}</>;
};

export default compose(withPaginate)(HistoryOrderPage);
