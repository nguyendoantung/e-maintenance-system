import React, {Component} from 'react'

// Material ui
import {Box} from '@material-ui/core'

class TabPanel extends Component {
  static a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    }
  }

  handleChange = (tabActive) => {
    const state = {tabActive}
    this.setState(state)
  }

  render() {
    const {value, index, children} = this.props
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...this.props}
      >
        {value === index && <Box>{children}</Box>}
      </Box>
    )
  }
}

export default TabPanel
