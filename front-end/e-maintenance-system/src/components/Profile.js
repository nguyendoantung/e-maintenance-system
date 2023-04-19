import { useQuery } from "react-query";
import rootApi from "../api/rootApi";
import path from "../api/path";
import { Button, Typography } from "@material-ui/core";
import useToken from "../utils/token";

function Profile() {
  const { removeToken } = useToken();
  const { data } = useQuery(
    ["get data"],
    () => rootApi.get(path.auth.profile),
    {
      refetchInterval: 120000,
    }
  );
  const profileData = data?.data;

  return (
    <div className="Profile">
      {profileData && (
        <>
          <Typography
            style={{
              textSize: "16px",
            }}
          >
            Welcome
          </Typography>
          <Typography
            style={{
              textSize: "16px",
            }}
          >
            {profileData.name}
          </Typography>
          <Button onClick={() => removeToken()}>Clear token</Button>
        </>
      )}
    </div>
  );
}

export default Profile;
