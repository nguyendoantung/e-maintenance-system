import React, { useContext, useEffect, useState } from "react";
import queryString from "query-string";
import { parseStringParamsToJson } from "../../utils/urls";
import history from "../history";

export const PaginateContext = React.createContext(true);

function usePagination() {
  const context = useContext(PaginateContext);
  if (context === undefined) {
    throw new Error("UseContext PaginateContext is undefined!");
  }
  return {
    page: context.page,
    pageSize: context.pageSize,
    handleChangePage: context.handleChangePage,
  };
}

function PaginateProvider(props) {
  const {
    page: pageUrl,
    size,
    ...extraParams
  } = parseStringParamsToJson(props.location?.search);
  const { defaultPageSize, defaultPage } = props;
  const [page, setPage] = useState(parseInt(pageUrl || defaultPage || 1, 10));
  const [pageSize, setPageSize] = useState(
    parseInt(size || defaultPageSize || 5, 10)
  );

  const onChangePaginationParam = (paging = 1, pagingSize = 25) => {
    setPage(paging);
    setPageSize(pagingSize);

    if (
      !props.keepUrl &&
      props.location &&
      !props.location.pathname?.includes("/tokens")
    ) {
      const search = queryString.stringify({
        ...extraParams,
        page: paging,
        size: pagingSize,
      });
      history.push({
        pathname: props.location.pathname,
        search,
      });
    }
  };

  useEffect(() => {
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(pageSize) ||
      page < 1 ||
      ![5, 10, 25].includes(pageSize)
    )
      onChangePaginationParam();
  }, [page, pageSize]);

  const handleChangePage = (event, newPage) => {
    onChangePaginationParam(newPage + 1, pageSize);
  };

  const handleChangeRowsPerPage = (event) => {
    const perPage = parseInt(event.target.value, 10);
    onChangePaginationParam(1, perPage);
  };

  return (
    <PaginateContext.Provider
      value={{
        page,
        handleChangePage,
        pageSize,
        handleChangeRowsPerPage,
      }}
    >
      {props.children}
    </PaginateContext.Provider>
  );
}

function withPaginate(Component) {
  return function PaginateComponent(props) {
    return (
      <PaginateProvider {...props}>
        <Component {...props} />
      </PaginateProvider>
    );
  };
}

export { PaginateProvider, withPaginate, usePagination };
