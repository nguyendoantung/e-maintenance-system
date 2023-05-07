import React from "react";
import { useQuery, useMutation } from "react-query";
import rootApi from "../api/rootApi";
import path from "../api/path";
import { Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Profile({ setToken, token }) {
  const { data } = useQuery(
    ["get data", token],
    () => rootApi.get(path.auth.profile),
    {
      refetchInterval: 5000,
    }
  );

  const { mutateAsync } = useMutation(["logout", token], () => {
    return rootApi.post(path.auth.logout);
  });

  const [profileData, setProfileData] = React.useState({});
  React.useEffect(() => {
    setProfileData(data?.data);
  }, [data, token]);
  // React.useEffect(() => {
  //   if (!isLoading && token) {
  //     console.log(isLoading);
  //     console.log(isError);
  //     console.log("clear token");
  //     setToken(null);
  //     localStorage.clear();
  //   }
  // }, [isLoading, isError]);

  const logout = () => {
    mutateAsync().then(() => {
      setToken(null);
      localStorage.clear();
    });
  };

    return (
      <div className="Profile">
      {profileData && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
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
                logout();
              }}
            />
          </div>
        </>
      )}
      </div>
    );
}

export default Profile;
