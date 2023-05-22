import rootApi from "../api/rootApi";
import path from "../api/path";
import { useQuery } from "react-query";

const GetDevice = ({ category, page, pageSize }) => {
  return useQuery(
    ["get_device", page, pageSize, category],
    () =>
      rootApi.get(path.admin.device.listDevice({ category, page, pageSize })),
    {}
  );
};

export default GetDevice;
