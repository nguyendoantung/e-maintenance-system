import {deleteEmptyPropertyFromObj} from '../data_util'

export const isJsonParamString = (str) => {
  try {
    JSON.parse(
      `{"${decodeURI(str)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`,
    )
  } catch (e) {
    return false
  }
  return true
}

export const parseStringParamsToJson = (params) => {
  if (!params) return {}
  const search = params.substring(1)
  if (!isJsonParamString(search)) return {}
  return JSON.parse(
    `{"${decodeURI(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`,
  )
}

export const redirect = (history, {page, pageSize, ...extraParams}) => {
  const objParam = {
    ...extraParams,
    ...(page && {page}),
    ...(pageSize && {size: pageSize}),
  }
  deleteEmptyPropertyFromObj(objParam)

  const url = `${history.location.pathname}?${new URLSearchParams(objParam)}`
  history.push(url)
}
