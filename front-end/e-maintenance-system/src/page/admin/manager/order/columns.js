import React from 'react';
import OrderAction from './Actions';

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
      Header: 'Ghi chú',
      accessor: 'note',
    },
    {
      Header: 'Người xử lý',
      accessor: 'staff_name',
    },
    {
      Header: 'Xử lý',
      accessor: (d) => {
        return <OrderAction order={d} />;
      },
    },
  ];
};

export default columns;
