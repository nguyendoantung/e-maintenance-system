import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppBar, Tabs, Box, Paper } from '@material-ui/core';
import LinkTab from '../../../../../components/Tab/LinkTab';
import TabPanel from '../../../../../components/form_helper/TabPanel';
import { StaffManagerTab } from '../../../../../components/constant';
import ManagerOrderByStaffPage from './ManagerOrderByStaff';
import OrderOfStaffPage from './orderOfStaff/OrderOfStaff';

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

const ManagerOrderForStaffPage = () => {
  const [tabName, setTabName] = React.useState(
    useLocation().state || StaffManagerTab.ACCEPT_ORDER.value
  );
  const history = useHistory();
  React.useEffect(() => {
    history.replace();
  }, []);
  const handleChange = (_event, newValue) => {
    setTabName(newValue);
  };
  const classes = useStyles();
  return (
    <>
      <Paper>
        <Box mt={-1} className={classes.root}>
          <AppBar position="static" color="inherit" elevation={0}>
            <Tabs
              value={tabName}
              onChange={handleChange}
              aria-label="nav tabs example"
              textColor="primary"
            >
              <LinkTab {...StaffManagerTab.ACCEPT_ORDER} />
              <LinkTab {...StaffManagerTab.MY_ORDER} />
            </Tabs>
          </AppBar>
        </Box>
      </Paper>
      <TabPanel
        value={StaffManagerTab.ACCEPT_ORDER.value}
        index={tabName}
        pt={2}
      >
        <ManagerOrderByStaffPage />
      </TabPanel>
      <TabPanel value={StaffManagerTab.MY_ORDER.value} index={tabName} pt={2}>
        <OrderOfStaffPage />
      </TabPanel>
    </>
  );
};

export default ManagerOrderForStaffPage;
