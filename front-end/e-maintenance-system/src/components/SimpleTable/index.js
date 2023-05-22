import React, { useContext } from "react";
import { useTable } from "react-table";
import { v4 as uuidv4 } from "uuid";
import MuiTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { Typography, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { PaginateContext } from "../context/PaginateContext";
import HandleLoading from "../HandleLoading";

const StyledTableHead = withStyles(() => ({}))(TableHead);

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5),
  },
}))(TableCell);

export default ({
  sparse,
  columns,
  data,
  total,
  loading,
  error,
  empty,
  isSuccess,
  isNotShowPage,
  onSelectedRow,
}) => {
  const { page, handleChangePage, pageSize, handleChangeRowsPerPage } =
    useContext(PaginateContext);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: data || [],
  });
  const hasData = !loading && !error;

  if (empty && isSuccess && !rows?.length) {
    return empty;
  }
  return (
    <Box style={{ overflowX: "auto" }}>
      <MuiTable size={sparse ? "" : "small"} {...getTableProps()}>
        <StyledTableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <StyledTableCell
                  {...column.getHeaderProps({
                    style: {
                      minWidth: column.minWidth,
                      width: column.width,
                      maxWidth: column.maxWidth,
                      textAlign: column.textAlign,
                    },
                  })}
                >
                  <strong>{column.render("Header")}</strong>
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </StyledTableHead>
        <TableBody>
          {(loading || error) && (
            <TableRow>
              <StyledTableCell colSpan={columns.length}>
                <HandleLoading loading={loading} error={error} />
              </StyledTableCell>
            </TableRow>
          )}
          {hasData &&
            rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  onClick={() => {
                    onSelectedRow?.(row.original);
                    row.toggleRowSelected?.();
                  }}
                  className={row.isSelected ? "row-selected" : ""}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell key={uuidv4()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          {hasData && rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Box
                  display="flex"
                  justifyContent="space-round"
                  alignContent="center"
                >
                  <Typography color="textSecondary">
                    Không có dữ liệu
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
      {!isNotShowPage && (
        <TablePagination
          component="div"
          labelRowsPerPage="Số bản ghi"
          rowsPerPageOptions={[25, 10, 5]}
          colSpan={3}
          count={total || 0}
          rowsPerPage={pageSize}
          page={page - 1}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};
