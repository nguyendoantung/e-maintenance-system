import React from "react";
import { useQuery } from "react-query";
import rootApi from "../api/rootApi";
import path from "../api/path";
import { Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Profile({ setToken, token }) {
  const { data, isError } = useQuery(
    ["get data", token],
    () => rootApi.get(path.auth.profile),
    {
      refetchInterval: 120000,
    }
  );

  const [profileData, setProfileData] = React.useState({});
  React.useEffect(() => {
    setProfileData(data?.data);
  }, [data]);
  React.useEffect(() => {
    if (isError && token) {
      setToken(null);
      localStorage.clear();
    }
  }, [isError]);

  return (
    <div className="Profile">
      {profileData && (
        <>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Typography
              style={{
                textSize: "16px",
              }}
            >
              {profileData.name}
            </Typography>
            <ExitToAppIcon
              style={{
                fontSize: "1rem",
              }}
              onClick={() => {
                setToken(null);
                localStorage.clear();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
