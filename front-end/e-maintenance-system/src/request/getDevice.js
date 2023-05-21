import rootApi from "../api/rootApi";
import path from "../api/path";
import { useQuery } from "react-query";

const GetDevice = ({ page, pageSize }) => {
  return useQuery(
    ["get_staff", page, pageSize],
    () => rootApi.get(path.admin.listStaff({ page, pageSize })),
    {}
  );
};

export default GetDevice;
