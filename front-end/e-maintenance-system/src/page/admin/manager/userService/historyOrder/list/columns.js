import React from 'react';
import DialogHistory from './DialogHistory';

const columns = () => {
  return [
    {
      Header: 'Tên đơn',
      accessor: (row) => {
        return <DialogHistory order={row} />;
      },
    },
    {
      Header: 'Ngày tạo',
      accessor: 'create_date',
    },
    {
      Header: 'Trạng thái',
      accessor: 'status',
    },
    {
      Header: 'Nhân viên',
      accessor: 'staff_name',
    },
    {
      Header: 'Giá',
      accessor: 'price',
    },
  ];
};

export default columns;
