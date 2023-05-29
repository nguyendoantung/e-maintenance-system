import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppBar, Tabs, Box, Paper } from '@material-ui/core';
import LinkTab from '../../../../components/Tab/LinkTab';
import TabPanel from '../../../../components/form_helper/TabPanel';
import { UserManagerTab } from '../../../../components/constant';

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

const OrderManagerPage = () => {
  const [tabName, setTabName] = React.useState(
    useLocation().state || UserManagerTab.LIST_ORDER.value
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
              <LinkTab {...UserManagerTab.LIST_ORDER} />
              <LinkTab {...UserManagerTab.HISTORY_ORDER} />
            </Tabs>
          </AppBar>
        </Box>
      </Paper>
      <TabPanel value={UserManagerTab.LIST_ORDER.value} index={tabName} pt={2}>
        List order page
      </TabPanel>
      <TabPanel
        value={UserManagerTab.HISTORY_ORDER.value}
        index={tabName}
        pt={2}
      >
        History order page
      </TabPanel>
    </>
  );
};

export default OrderManagerPage;
