import React from "react";

const columns = () => {
  return [
    {
      Header: "Name",
      accessor: ({ FirstName, LastName }) => {
        return (
          <div>
            {FirstName} {LastName}
          </div>
        );
      },
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
  ];
};

export default columns;
