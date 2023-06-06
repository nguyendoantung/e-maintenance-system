import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import { compose } from 'redux';
import {
  withPaginate,
  usePagination,
} from '../../../../../../components/context/PaginateContext';
import SimpleTable from '../../../../../../components/SimpleTable';
import columns from './columns';
import GetRepairOrder from '../../../../../../request/getRepairOrder';
import { Card, Box, Button, Typography } from '@material-ui/core';
import CreateRepairOrderPage from '../../createRepairOrder/CreateRepairOrderPage';

const ListOrderPage = () => {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [openRepair, setOpenRepair] = React.useState(false);
  const { adminId } = useParams();
  const { page, pageSize } = usePagination();
  const { data, refetch, isLoading, error, isSuccess } = GetRepairOrder({
    adminId,
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
    if (listOrders.length === 0 && !isLoading) {
      return <Typography>This empty here</Typography>;
    }
    return (
      <>
        <Card>
          <Box mb={2} pt={2} pr={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenRepair(true)}
            >
              Thêm đơn
            </Button>
          </Box>
          <CreateRepairOrderPage
            open={openRepair}
            token={token}
            setOpen={setOpenRepair}
          />
          {table}
        </Card>
      </>
    );
  };
  return <>{renderContent()}</>;
};

export default compose(withPaginate)(ListOrderPage);
