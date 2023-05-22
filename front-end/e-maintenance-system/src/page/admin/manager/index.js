import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { AppBar, Tabs, Box, Paper } from "@material-ui/core";
import LinkTab from "../../../components/Tab/LinkTab";
import TabPanel from "../../../components/form_helper/TabPanel";
import { ManagerTab } from "../../../components/constant";
import StaffPage from "./staff/list/StaffPage";
import DevicePage from "./device/list/DevicePage";

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

const ManagerPage = () => {
  const [tabName, setTabName] = React.useState(
    useLocation().state || ManagerTab.STAFF.value
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
              <LinkTab {...ManagerTab.STAFF} />
              <LinkTab {...ManagerTab.DEVICE} />
              <LinkTab {...ManagerTab.ORDER} />
            </Tabs>
          </AppBar>
        </Box>
      </Paper>
      <TabPanel value={ManagerTab.STAFF.value} index={tabName} pt={2}>
        <StaffPage />
      </TabPanel>
      <TabPanel value={ManagerTab.DEVICE.value} index={tabName} pt={2}>
        <DevicePage />
      </TabPanel>
      <TabPanel value={ManagerTab.ORDER.value} index={tabName} pt={2}>
        This is order manager page
      </TabPanel>
    </>
  );
};

export default ManagerPage;
