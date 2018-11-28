import ApiHandler from '../Api/ApiHandler.js';
import { getFileList } from '../Api/ApiHandler.js';


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