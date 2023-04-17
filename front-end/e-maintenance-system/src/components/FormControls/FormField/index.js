/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import {Grid, Typography} from '@material-ui/core'
import Box from '@material-ui/core/Box'

function FormField(props) {
  const {
    label,
    dense,
    naked,
    helpText,
    justifyAlignment,
    labelMultiline,
    labelVariant = 'subtitle1',
  } = props
  const {touched, error} = props.meta || {}
  const col = justifyAlignment || (naked ? 0 : 2)

  const renderLabelMultiline = () => {
    let result = ''
    if (labelMultiline) {
      result = (
        <Box display="flex" justifyContent="start">
          <Typography variant={labelVariant} color="initial">
            {label}
          </Typography>
        </Box>
      )
    }
    return result
  }

  const renderLabelSingleline = () => {
    let result = ''
    if (!labelMultiline) {
      result = (
        <Grid item md={col}>
          <Box display="flex" justifyContent="flex-end">
            <Typography variant={labelVariant} color="initial">
              {label}
            </Typography>
          </Box>
        </Grid>
      )
    }
    return result
  }

  return (
    <FormControl
      style={{
        width: '100%',
        display: 'block',
        margin: dense ? '4px 0' : '16px 0',
      }}
      error={touched && error}
    >
      {renderLabelMultiline()}
      <Grid container spacing={1}>
        {renderLabelSingleline()}
        <Grid item md={12 - col}>
          {props.children}
          {helpText && (!touched || !error) && (
            <FormHelperText>{helpText}</FormHelperText>
          )}
          {touched && error && <FormHelperText>{error}</FormHelperText>}
        </Grid>
      </Grid>
    </FormControl>
  )
}

FormField.propTypes = {
  labelMultiline: PropTypes.bool,
}

FormField.defaultProps = {
  labelMultiline: false,
}

export default FormField
