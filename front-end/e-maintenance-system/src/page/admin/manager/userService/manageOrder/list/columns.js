import React from 'react';
import DialogHistory from '../../historyOrder/list/DialogHistory';

const columns = () => {
  return [
    {
      Header: 'Tên đơn',
      accessor: (row) => {
        return <DialogHistory order={row} />;
      },
    },
    {
      Header: 'Liên hệ',
      accessor: 'phone',
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
    {
      Header: 'Địa chỉ',
      accessor: 'location',
    },
    {
      Header: 'Thiết bị',
      accessor: 'device',
    },
  ];
};

export default columns;
