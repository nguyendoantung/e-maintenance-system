import React from 'react'

// Material-ui
import {Box, Typography} from '@material-ui/core'

class Page404 extends React.Component {
  render() {
    return (
      <Box my={10} textAlign="center">
        <Typography variant="h1" color="initial">
          PAGE NOT FOUND!
        </Typography>
        <Typography
          variant="h1"
          color="primary"
          style={{
            fontSize: 100,
          }}
        >
          404
        </Typography>
      </Box>
    )
  }
}

export default Page404
