import rootApi from "../api/rootApi";
import path from "../api/path";
import { useQuery } from "react-query";

const GetCategory = () => {
  return useQuery(
    ["get_category"],
    () => rootApi.get(path.admin.category.listCategory({})),
    {}
  );
};

export default GetCategory;
