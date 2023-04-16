import { useQuery } from "react-query";
import rootApi from "../api/rootApi";
import path from "../api/path";

function Profile(props) {
  const { data } = useQuery(
    ["get data"],
    () => rootApi.get(path.auth.profile),
    {}
  );
  const profileData = data?.data;
  return (
    <div className="Profile">
      <p>To get your profile details: </p>
      {profileData && (
        <div>
          <p>Profile name: {profileData.name}</p>
          <p>About me: {profileData.about}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
