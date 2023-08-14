import React from 'react';
import OrderOfStaffAction from './Actions';

const columns = () => {
  return [
    {
      Header: 'Tên đơn',
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
      accessor: (row) => {
        const { device_use } = row;
        return device_use.map((item) => {
          return <div key="device">{item}</div>;
        });
      },
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
