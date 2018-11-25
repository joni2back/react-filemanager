export const setDirectory = (directory) => {
   return {
        type: 'SET_DIRECTORY',
        value: directory
    };
};

export const buildFileList = () => {
    return {
        type: 'SET_FILE_LIST',
        value: [{
            name: btoa(Math.random() + new Date().toTimeString()),
            type: "dir",
        }, {
            name: btoa(Math.random() + new Date().toTimeString()),
            type: "file",
        }, {
            name: btoa(Math.random() + new Date().toTimeString()),
            type: "file",
        }]
    };
};

export const setFileListFilter = (search) => {
   return {
        type: 'SET_FILE_LIST_FILTER',
        value: search
    };
};