export const defaultState = {
    path: [],
    pathSublist: [],
    fileList: [],
    fileListSublist: [],
    fileListFilter: null,
    contextMenuVisible: null,
    contextMenuPosition: [],
    contextMenuPositionElement: null,
    selectedFiles: [],
    selectedFolderSublist: null,
    loading: false,
    loadingSublist: false,
    errorMsg: null,
    visibleModalCreateFolder: false,
    visibleModalFileContent: false,
    visibleModalFileEdit: false,
    visibleModalMoveFile: false,
    visibleModalCopyFile: false,
    fileContentBlobUrl: null
};

/**
 * Main content reducer
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
const MainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PATH':
            return Object.assign({}, state, {
                path: action.value
            });
        case 'SET_PATH_SUB_LIST':
            return Object.assign({}, state, {
                pathSublist: action.value
            });
        case 'ENTER_TO_DIRECTORY':
            return Object.assign({}, state, {
                path: [...state.path, action.value]
            });
        case 'ENTER_TO_DIRECTORY_SUB_LIST':
            return Object.assign({}, state, {
                pathSublist: [...state.pathSublist, action.value]
            });
        case 'SET_FILE_LIST':
            return Object.assign({}, state, {
                fileList: action.value.sort((a, b) => a.type < b.type ? -1 : a.name.toLowerCase() > b.name.toLowerCase())
            });
        case 'SET_FILE_LIST_SUB_LIST':
            return Object.assign({}, state, {
                fileListSublist: action.value.sort((a, b) => a.type < b.type ? -1 : a.name.toLowerCase() > b.name.toLowerCase())
            });

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
                selectedFiles: (action.value).filter((f, i, self) => self.map(ff => ff.name).indexOf(f.name) === i)
            });
        case 'SET_SELECTED_FOLDER_SUB_LIST':
            return Object.assign({}, state, {
                selectedFolderSublist: action.value
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
        case 'SET_LOADING_SUB_LIST':
            return Object.assign({}, state, { 
                loadingSublist: action.value
            });
        case 'SET_ERROR_MSG':
            return Object.assign({}, state, { 
                errorMsg: action.value
            });

        case 'SET_VISIBLE_MODAL_CREATE_FOLDER':
            return Object.assign({}, state, { 
                visibleModalCreateFolder: !!action.value
            });

        case 'SET_VISIBLE_MODAL_FILE_CONTENT':
            return Object.assign({}, state, { 
                visibleModalFileContent: !!action.value
            });

        case 'SET_VISIBLE_MODAL_FILE_EDIT':
            return Object.assign({}, state, { 
                visibleModalFileEdit: !!action.value
            });

        case 'SET_VISIBLE_MODAL_MOVE_FILE':
            return Object.assign({}, state, { 
                visibleModalMoveFile: !!action.value
            });
        case 'SET_VISIBLE_MODAL_COPY_FILE':
            return Object.assign({}, state, { 
                visibleModalCopyFile: !!action.value
            });
        case 'SET_FILE_CONTENT':
            /**
             * Removing old blob url
             */
            state.fileContentBlobUrl && URL.revokeObjectURL(state.fileContentBlobUrl);
            return Object.assign({}, state, { 
                fileContentBlobUrl: action.value ? URL.createObjectURL(action.value) : null
            });

        default:
            return state;
    }
};

export default MainReducer;
