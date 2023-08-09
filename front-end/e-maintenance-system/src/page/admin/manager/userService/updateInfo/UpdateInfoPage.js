import React from 'react';
import { useQuery } from 'react-query';
import rootApi from '../../../../../api/rootApi';
import path from '../../../../../api/path';
import { useParams } from 'react-router';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  CircularProgress,
  Button,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  boxCenter: {
    textAlign: 'center',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const UpdateInfoPage = () => {
  const { adminID } = useParams();
  const classes = useStyles();
  const { data, isLoading } = useQuery(
    ['get data', adminID],
    () => rootApi.get(path.auth.profile),
    {}
  );
  const [profileData, setProfileData] = React.useState({});
  React.useEffect(() => {
    setProfileData(data?.data);
  }, [data, adminID]);
  const { profile_link: profileLink = '' } = profileData || {};

  return (
    <>
      {isLoading && <CircularProgress />}
      {profileData && (
        <>
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
          >
            <Grid item xs={3}>
              <Avatar src={profileLink} className={classes.large} />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
          >
            <Grid item>
              <Card
                sx={{
                  p: 2,
                  bgcolor: 'background.default',
                  display: 'grid',
                  gridTemplateColumns: { md: '2fr 2fr' },
                  gap: 2,
                  m: 2,
                }}
              >
                <CardContent>
                  <Typography>Name: {profileData.name}</Typography>
                  <Typography>Email: {profileData.email}</Typography>
                  <Typography>Phone: {profileData.phone}</Typography>
                </CardContent>
              </Card>
              {/* <DialogActions>
                <Button variant="contained" color="primary">
                  Cập nhật thông tin
                </Button>
              </DialogActions> */}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default UpdateInfoPage;
