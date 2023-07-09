import React from 'react';

const columns = () => {
  return [
    {
      Header: 'Tên đơn',
      accessor: 'full_name',
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
