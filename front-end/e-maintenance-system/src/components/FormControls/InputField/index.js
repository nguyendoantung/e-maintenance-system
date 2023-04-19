import React, {useState} from 'react'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'

import makeStyles from '@material-ui/core/styles/makeStyles'
import {InputAdornment} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import FormHelperText from '@material-ui/core/FormHelperText'
import {Visibility, VisibilityOff} from '@material-ui/icons'
import {v4 as uuidv4} from 'uuid'
import Copiable from '../../Copiable'
import FormField from '../FormField'

const useStyles = makeStyles(() => ({
  field: {
    width: '100%',
  },
  warning: {
    color: '#E7A600',
    fontWeight: 500,
  },
}))
const getInputType = (type, passwordVisible) => {
  if (type !== 'password') return type
  if (passwordVisible) return 'text'
  return 'password'
}
export default function InputField(props) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const handleClickShowPassword = () => setPasswordVisible(!passwordVisible)
  const {
    input,
    required,
    type,
    placeholder,
    disabled,
    endAdornment,
    multiline,
    rows,
    rowsMax,
    inputProps,
    readOnly,
    style,
    meta: {touched, error, warning},
  } = props
  const css = useStyles()
  const helperTextId = uuidv4()
  return (
    <FormField {...props}>
      <TextField
        {...input}
        data-testid={`${props.input.name}-input`}
        multiline={multiline}
        rows={rows}
        rowsMax={rowsMax}
        placeholder={placeholder}
        inputProps={inputProps}
        type={getInputType(type, passwordVisible)}
        error={touched && error}
        required={required}
        disabled={disabled}
        className={css.field}
        aria-describedby={helperTextId}
        readOnly={readOnly}
        style={style}
        endAdornment={
          endAdornment ||
          (type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {passwordVisible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )) ||
          (type === 'token' && (
            <InputAdornment position="end">
              <Copiable text={placeholder} />
            </InputAdornment>
          ))
        }
        inputlabelprops={{shrink: false}}
        variant="outlined"
      />
      {touched && warning && (
        <FormHelperText id={helperTextId} className={css.warning}>
          {warning}
        </FormHelperText>
      )}
    </FormField>
  )
}
