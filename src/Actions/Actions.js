import { getFileList, createFolder } from '../Api/ApiHandler.js';


/**
 * Request API to get file list for the selected path then refresh UI
 * @returns {Function}
 */
export const refreshFileList = () => (dispatch, getState) => {
    const { path } = getState();
    dispatch(setLoading(true));

    getFileList(path.join('/')).then(r => {
        dispatch(setLoading(false));
        dispatch(setFileList(r));
    }).catch(r => {
        dispatch({
            type: 'SET_ERROR_MSG',
            value: r.toString()
        });
        dispatch(setLoading(false));
    });
};


/**
 * Request API to create a folder then dispatch defined events
 * @param {String} createFolderName
 * @returns {Function}
 */
export const createNewFolder = (createFolderName) => (dispatch, getState) => {
    const { path } = getState();
    dispatch(setLoading(true));

    createFolder(path.join('/'), createFolderName).then(r => {
        dispatch(setVisibleModalCreateFolder(false));
        dispatch(setLoading(false));
        dispatch(refreshFileList());
    }).catch(r => {
        dispatch({
            type: 'SET_ERROR_MSG',
            value: r.toString()
        });
        dispatch(setLoading(false));
    });
};


/**
 * This handles multiple selection by using shift key
 * @param {Object} lastFile
 * @returns {Function}
 */
export const setSelectedFileFromLastTo = (lastFile) => (dispatch, getState) => {
    const { fileList, selectedFiles } = getState();

    const lastPreviouslySelected = [...selectedFiles].pop();
    const lastPreviouslySelectedIndex = fileList.indexOf(fileList.find(f => f.name == lastPreviouslySelected.name))
    const lastSelectedIndex = fileList.indexOf(fileList.find(f => f.name == lastFile.name))

    let toAdd = [];
    if (lastSelectedIndex > lastPreviouslySelectedIndex) {
        toAdd = fileList.filter((index, element) => {
            return fileList.indexOf(index) <= lastSelectedIndex && fileList.indexOf(index) >= lastPreviouslySelectedIndex
        });
    } else {
        toAdd = fileList.filter((index, element) => {
            return fileList.indexOf(index) >= lastSelectedIndex && fileList.indexOf(index) <= lastPreviouslySelectedIndex
        });
    }

    dispatch({
        type: 'SET_SELECTED_FILES',
        value: [...selectedFiles, ...toAdd]
    });
};

export const setPath = (path) => {
   return {
        type: 'SET_PATH',
        value: path
    };
};

export const enterToDirectory = (directory) => {
   return {
        type: 'ENTER_TO_DIRECTORY',
        value: directory
    };
};

export const setFileList = (fileList) => {
   return {
        type: 'SET_FILE_LIST',
        value: fileList
    };
};

export const setFileListFilter = (search) => {
   return {
        type: 'SET_FILE_LIST_FILTER',
        value: search
    };
};

export const setContextMenuVisible = (visible) => {
   return {
        type: 'SET_CONTEXT_MENU_VISIBLE',
        value: !!visible
    };
};

export const setContextMenuPosition = (x, y) => {
   return {
        type: 'SET_CONTEXT_MENU_POSITION',
        value: [x, y]
    };
};

export const setContextMenuPositionElement = (element) => {
   return {
        type: 'SET_CONTEXT_MENU_POSITION_ELEMENT',
        value: element
    };
};

export const addSelectedFile = (name) => {
   return {
        type: 'ADD_SELECTED_FILE',
        value: name
    };
};

export const toggleSelectedFile = (name) => {
   return {
        type: 'TOGGLE_SELECTED_FILE',
        value: name
    };
};

export const setLoading = (value) => {
   return {
        type: 'SET_LOADING',
        value: value
    };
};

export const setVisibleModalCreateFolder = (visible) => {
   return {
        type: 'SET_VISIBLE_MODAL_CREATE_FOLDER',
        value: !!visible
    };
};