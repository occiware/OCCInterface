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
