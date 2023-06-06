import React from 'react';

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
