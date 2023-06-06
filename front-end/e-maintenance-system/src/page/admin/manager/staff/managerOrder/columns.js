import React from 'react';

const columns = () => {
  return [
    {
      Header: 'Người tạo',
      accessor: 'full_name',
    },
    {
      Header: 'Người xử lý',
      accessor: 'staff_name',
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
    {
      Header: 'Xử lý',
      accessor: (d) => {
        return `${d}`;
      },
    },
  ];
};

export default columns;
