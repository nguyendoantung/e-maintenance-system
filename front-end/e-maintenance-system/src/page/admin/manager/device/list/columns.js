import React from "react";

const columns = () => {
  return [
    {
      Header: "Ảnh",
      accessor: "image_link",
      Cell: (tableProps) => (
        <img
          src={tableProps.row.original.image_link}
          width={60}
          alt="Hình dáng sản phẩm"
        />
      ),
    },
    {
      Header: "Loại",
      accessor: ({ category }) => {
        return <div>{category}</div>;
      },
    },
    {
      Header: "Tên",
      accessor: "name",
    },
    {
      Header: "Giá",
      accessor: "price",
    },
  ];
};

export default columns;
