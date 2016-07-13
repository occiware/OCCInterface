const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_QUERY_PATH':
            return {
                ...state,
                currentPath: action.currentPath
              }
        case 'SET_CURRENT_JSON':
            return {
                ...state,
                currentJson: action.currentJson
              }
        default:
            return state
    }
}

export default reducer
