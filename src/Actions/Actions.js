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

export const refreshFileList = () => {
    return setFileList([{
            name: btoa(Math.random() + new Date().toTimeString()).substring(0, 10),
            type: "dir",
        }, {
            name: btoa(Math.random() + new Date().toTimeString()).substring(0, 10),
            type: "file",
        }, {
            name: btoa(Math.random() + new Date().toTimeString()).substring(0, 10),
            type: "file",
        }]
    );
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