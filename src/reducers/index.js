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
        case 'SET_ACTION':
            return {
                ...state,
                codeRights: 'action',
                actionQ: action.actionQ
            }
        case 'SET_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: {
                  simple: action.simple,
                  detailed: action.detailed
                }
            }
        case 'SET_OK_MESSAGE':
            return {
                ...state,
                okMessage: action.message
            }
        case 'SET_CURRENT_URL_SERVER':
            return {
                ...state,
                currentURLServer: action.currentURLServer
            }
        case 'SET_CURRENT_SCHEMES':
            return {
                ...state,
                currentSchemes: action.currentSchemes
            }
        default:
            return state
    }
}

export default reducer
