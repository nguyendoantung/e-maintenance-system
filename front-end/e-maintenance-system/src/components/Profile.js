import React from "react";
import { useQuery } from "react-query";
import rootApi from "../api/rootApi";
import path from "../api/path";
import { Button, Typography } from "@material-ui/core";

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
          <Typography
            style={{
              textSize: "16px",
            }}
          >
            Welcome
          </Typography>

          {token && (
            <>
              <Typography
                style={{
                  textSize: "16px",
                }}
              >
                {profileData.name}
              </Typography>
              <Button
                onClick={() => {
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Đăng xuất
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
