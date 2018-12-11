import { getFileList, createFolder, getFileBody, removeFile } from '../Api/ApiHandler.js';


/**
 * Request API to get file list for the selected path then refresh UI
 * @returns {Function}
 */
export const refreshFileList = () => (dispatch, getState) => {
    const { path } = getState();
    dispatch(setLoading(true));
    dispatch(setSelectedFiles([]));

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
 * Request API to get file list for the selected path then refresh UI
 * @returns {Function}
 */
export const refreshFileListSublist = () => (dispatch, getState) => {
    const { pathSublist } = getState();
    dispatch(setLoadingSublist(true));
    dispatch(setSelectedFolderSublist([]));

    getFileList(pathSublist.join('/')).then(r => {
        dispatch(setLoadingSublist(false));
        dispatch(setFileListSublist(r));
    }).catch(r => {
        dispatch({
            type: 'SET_ERROR_MSG',
            value: r.toString()
        });
        dispatch(setLoadingSublist(false));
    });
};


/**
 * Request API to get file content then dispatch defined events
 * @param {String} fileName
 * @returns {Function}
 */
export const getFileContent = (fileName) => (dispatch, getState) => {
    const { path } = getState();

    dispatch(setLoading(true));
    dispatch(setFileContent(null));
    dispatch(setVisibleModalFileContent(true));
    getFileBody(path.join('/'), fileName).then(blob => {
        dispatch(setFileContent(blob));
        dispatch(setLoading(false));
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
 * Request API to create a folder then dispatch defined events
 * @param {Array} filenames
 * @returns {Function}
 */
export const removeItems = (files) => (dispatch, getState) => {
    const { path } = getState();
    const filenames = files.map(f => f.name);

    dispatch(setLoading(true));
    removeFile(path.join('/'), filenames).then(r => {
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
    const lastPreviouslySelectedIndex = fileList.indexOf(fileList.find(f => f.name === lastPreviouslySelected.name))
    const lastSelectedIndex = fileList.indexOf(fileList.find(f => f.name === lastFile.name))

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
    dispatch(setSelectedFiles([...selectedFiles, ...toAdd]));
};


/**
 * @returns {Function}
 */
export const initSubList = () => (dispatch, getState) => {
    dispatch(setSelectedFolderSublist(null));
    dispatch(setFileListSublist([]));    
    dispatch(setPathSublist([]));
    dispatch(refreshFileListSublist());
};

export const enterToPreviousDirectorySublist = () => (dispatch, getState) => {
    const { pathSublist } = getState();
    dispatch(setPathSublist(pathSublist.slice(0, -1)));
};

export const setPath = (path) => {
    return {
        type: 'SET_PATH',
        value: path
    };
};

export const setPathSublist = (path) => {
    return {
        type: 'SET_PATH_SUB_LIST',
        value: path
    };
};

export const enterToDirectory = (directory) => {
    return {
        type: 'ENTER_TO_DIRECTORY',
        value: directory
    };
};

export const enterToDirectorySublist = (directory) => {
    return {
        type: 'ENTER_TO_DIRECTORY_SUB_LIST',
        value: directory
    };
};

export const setFileList = (fileList) => {
    return {
        type: 'SET_FILE_LIST',
        value: fileList
    };
};

export const setFileListSublist = (fileList) => {
    return {
        type: 'SET_FILE_LIST_SUB_LIST',
        value: fileList
    };
};

export const setSelectedFiles = (files) => {
    return {
        type: 'SET_SELECTED_FILES',
        value: files
    };
};

export const setSelectedFolderSublist = (file) => {
    return {
        type: 'SET_SELECTED_FOLDER_SUB_LIST',
        value: file
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

export const toggleSelectedFile = (file) => {
    return {
        type: 'TOGGLE_SELECTED_FILE',
        value: file
    };
};

export const rightClickOnFile = (file) => (dispatch, getState) => {
    const { selectedFiles } = getState();
    const isSelected = selectedFiles.indexOf(selectedFiles.find(f => f.name === file.name)) !== -1;

    !isSelected && dispatch(setSelectedFiles([file]));
};

export const setLoading = (value) => {
    return {
        type: 'SET_LOADING',
        value: value
    };
};

export const setLoadingSublist = (value) => {
    return {
        type: 'SET_LOADING_SUB_LIST',
        value: value
    };
};

export const setVisibleModalCreateFolder = (visible) => {
    return {
        type: 'SET_VISIBLE_MODAL_CREATE_FOLDER',
        value: !!visible
    };
};

export const setVisibleModalMoveFile = (visible) => {
    return {
        type: 'SET_VISIBLE_MODAL_MOVE_FILE',
        value: !!visible
    };
};

export const setVisibleModalCopyFile = (visible) => {
    return {
        type: 'SET_VISIBLE_MODAL_COPY_FILE',
        value: !!visible
    };
};

export const setVisibleModalFileContent = (visible) => {
    return {
        type: 'SET_VISIBLE_MODAL_FILE_CONTENT',
        value: !!visible
    };
};


export const setFileContent = (blob) => {
   return {
        type: 'SET_FILE_CONTENT',
        value: blob
    };
};