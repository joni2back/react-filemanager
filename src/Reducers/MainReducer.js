export const defaultState = {
    currentDir: '/',
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
};

/**
 *
 * This state describes all the information the connector needs and what happen regarding this.
 * Each time the connector needs environment information,it should be supplied via this part of the state.
 * @param {object} state
 * @param {object} action
 *
 * @returns {object}
 */
const MainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_DIRECTORY':
            return Object.assign({}, state, { currentDir: action.value });
        case 'SET_FILE_LIST':
            return Object.assign({}, state, { fileList: action.value });
        case 'SET_FILE_LIST_FILTER':
            return Object.assign({}, state, { 
                fileListFilter: action.value
            });

        default:
            return state;
    }
};

export default MainReducer;
