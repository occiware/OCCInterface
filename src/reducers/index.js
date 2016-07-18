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
        case 'SET_EDITABLE':
            return {
                ...state,
                codeRights: 'write'
            }
        case 'SET_READABLE':
            return {
                ...state,
                codeRights: 'read'
            }
        case 'SET_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}

export default reducer
