export const defaultState = {
    path: [],
    fileList: [{
        name: "documents",
        type: "dir",
    }, {
        name: "video.avi",
        type: "file",
    }, {
        name: "foto.jpg",
        type: "file",
    }],
    fileListFilter: null,
    contextMenuVisible: null,
    contextMenuPosition: [],
};

const MainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PATH':
            return Object.assign({}, state, { path: action.value });
        case 'ENTER_TO_DIRECTORY':
            let path = Array.from(state.path);
            path.push(action.value);
            return Object.assign({}, state, { path: path });

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

        default:
            return state;
    }
};

export default MainReducer;
