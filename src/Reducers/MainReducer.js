export const defaultState = {
    path: [],
    fileList: [],
    fileListFilter: null,
    contextMenuVisible: null,
    contextMenuPosition: [],
    contextMenuPositionElement: null,
    selectedFiles: [],
    loading: false,
    errorMsg: null,
};

const MainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PATH':
            return Object.assign({}, state, {
                path: action.value
            });
        case 'ENTER_TO_DIRECTORY':
            return Object.assign({}, state, {
                path: [...state.path, action.value]
            });
        case 'SET_FILE_LIST':
            return Object.assign({}, state, { fileList: action.value });
        case 'SET_FILE_LIST_FILTER':
            return Object.assign({}, state, { 
                fileListFilter: action.value
            });
        case 'SET_CONTEXT_MENU_VISIBLE':
            return Object.assign({}, state, { 
                contextMenuVisible: action.value
            });
        case 'SET_CONTEXT_MENU_POSITION':
            return Object.assign({}, state, { 
                contextMenuPosition: action.value
            });
        case 'SET_CONTEXT_MENU_POSITION_ELEMENT':
            return Object.assign({}, state, { 
                contextMenuPositionElement: action.value
            });
        case 'SET_SELECTED_FILES':
            return Object.assign({}, state, { 
                selectedFiles: action.value
            });
        case 'ADD_SELECTED_FILE':
            return Object.assign({}, state, { 
                selectedFiles: [...state.selectedFiles, action.value]
            });
        case 'TOGGLE_SELECTED_FILE':
            return Object.assign({}, state, {
                selectedFiles: state.selectedFiles.find(f => f.name === action.value.name) ?
                    state.selectedFiles.filter(f => f.name !== action.value.name) :
                    [...state.selectedFiles, action.value]
            });
        case 'SET_LOADING':
            return Object.assign({}, state, { 
                loading: action.value
            });
        case 'SET_ERROR_MSG':
            return Object.assign({}, state, { 
                errorMsg: action.value
            });

        default:
            return state;
    }
};

export default MainReducer;
