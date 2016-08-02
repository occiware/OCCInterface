export function setCurrentQueryPath(currentPath) {
  return {
    type: 'SET_CURRENT_QUERY_PATH',
    currentPath: currentPath
  }
}

export function setCurrentJson(currentJson) {
  return {
    type: 'SET_CURRENT_JSON',
    currentJson: currentJson
  }
}

export function setEditableCode() {
  return {
    type: 'SET_EDITABLE'
  }
}

export function setReadableCode() {
  return {
    type: 'SET_READABLE'
  }
}

export function setErrorMessage(simple, detailed) {
  return {
    type: 'SET_ERROR_MESSAGE',
    simple: simple,
    detailed: detailed
  }
}

export function setOkMessage(message) {
  return {
    type: 'SET_OK_MESSAGE',
    message: message
  }
}
