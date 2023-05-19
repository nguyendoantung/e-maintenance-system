import rootApi from "../api/rootApi";
import path from "../api/path";
import { useQuery } from "react-query";

const GetStaff = ({ page, pageSize }) => {
  return useQuery(
    ["get_staff"],
    () => rootApi.get(path.admin.listStaff({ page, pageSize })),
    {}
  );
};

export default GetStaff;
