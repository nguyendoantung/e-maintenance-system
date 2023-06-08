import React from 'react';
import OrderOfStaffAction from './Actions';

const columns = () => {
  return [
    {
      Header: 'Người tạo',
      accessor: 'full_name',
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
      Header: 'Địa chỉ',
      accessor: 'location',
    },
    {
      Header: 'Thiết bị',
      accessor: 'device',
    },
    {
      Header: 'Note',
      accessor: 'note',
    },
    {
      Header: 'Thiết bị sử dụng',
      accessor: 'used_device',
    },
    {
      Header: 'Giá',
      accessor: 'price',
    },
    {
      Header: 'Xử lý',
      accessor: (d) => {
        return <OrderOfStaffAction order={d} />;
      },
    },
  ];
};

export default columns;
