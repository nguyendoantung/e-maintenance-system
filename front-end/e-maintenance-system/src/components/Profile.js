import { useQuery } from "react-query";
import rootApi from "../api/rootApi";
import path from "../api/path";
import { Button, Typography } from "@material-ui/core";

function Profile({ token, setToken }) {
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
                Clear token
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
