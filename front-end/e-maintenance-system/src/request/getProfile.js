import rootApi from '../api/rootApi';
import path from '../api/path';
import { useQuery } from 'react-query';

const GetProfile = () => {
  return useQuery(['get_profile_user'], () => rootApi.get(path.profile()), {
    refetchInterval: 5000,
  });
};

export default GetProfile;
