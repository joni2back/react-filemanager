import * as API from './Api.js';
import config from './../config.js';

const messageTranslation = {
    'unknown_response': 'Unknown error response from connector',
    'TypeError: Failed to fetch': 'Cannot get a response from connector.',
};

/**
 * Response handler for fetch responses
 * @param {Function} resolve
 * @param {Function} reject
 * @returns {Object}
 */
const handleFetch = (resolve, reject) => {
    return {
        xthen: (response) => {
            const contentType = response.headers.get('content-type');
            const contentDisp = response.headers.get('content-disposition');
            const isJson = /(application|text)\/json/.test(contentType);
            const isAttachment = /attachment/.test(contentDisp);

            if (! response.ok) {
                if (isJson) {
                    throw response.json();
                }
                throw Error(messageTranslation['unknown_response']);
            }

            if (isAttachment) {
                response.blob().then(blob => {
                    resolve(blob);
                });
                return;
            }

            if (isJson) {
                response.json().then(json => {
                    if (! json.success) {
                        throw new Error();
                    }
                    resolve(json.data);
                });
                return;
            }
        },
        xcatch: (errorResponse) => {
            // is thrown json
            if (errorResponse && errorResponse.then) {
                errorResponse.then(errJson => {
                    return reject(errJson.errorMsg || JSON.stringify(errJson));
                });
            } else {
                return reject(messageTranslation[errorResponse] || errorResponse);
            }
        }
    }
}

/**
 * Clean path string removing double slashes and prepending a slash
 * @param {String} path
 * @returns {String}
 */
const fixPath = (path) => {
    return ('/' + path).replace(/\/\//g, '/');
};

/**
 * Wrap API response for retrive file liest
 * @param {String} path
 * @returns {Object}
 */
export const getFileList = (path) => {
    path = fixPath(path);
    return new Promise((resolve, reject) => {
        return API.list(path)
            .then(handleFetch(resolve, reject).xthen)
            .catch(handleFetch(resolve, reject).xcatch)
    })
};

/**
 * Wrap API response for retrive file content
 * @param {String} path
 * @returns {Object}
 */
export const getFileBody = (path, filename) => {
    path = fixPath(path + '/' + filename);
    return new Promise((resolve, reject) => {
        return API.getFileContent(path)
            .then(handleFetch(resolve, reject).xthen)
            .catch(handleFetch(resolve, reject).xcatch)
    })
};


/**
 * Wrap API response for retrive file content
 * @param {String} path
 * @returns {Object}
 */
export const renameItem = (path, filename, newFileName) => {
    const oldPath = fixPath(path + '/' + filename);
    const newPath = fixPath(path + '/' + newFileName);

    return new Promise((resolve, reject) => {
        return API.rename(oldPath, newPath)
            .then(handleFetch(resolve, reject).xthen)
            .catch(handleFetch(resolve, reject).xcatch)
    })
};

/**
 * Wrap API response for create folder
 * @param {String} path
 * @param {String} folder
 * @returns {Object}
 */
export const createFolder = (path, folder) => {
    path = fixPath(path);
    return new Promise((resolve, reject) => {
        if (! (folder || '').trim()) {
            return reject('Invalid folder name');
        }
        return API.createDirectory(path, folder)
            .then(handleFetch(resolve, reject).xthen)
            .catch(handleFetch(resolve, reject).xcatch)
    })
};

/**
 * Wrap API response for remove file or folder
 * @param {String} path
 * @param {Array} filenames
 * @param {Boolean} recursive
 * @returns {Object}
 */
export const removeItems = (path, filenames, recursive = true) => {
    path = fixPath(path);
    return new Promise((resolve, reject) => {
        if (! filenames.length) {
            return reject('No files to remove');
        }
        return API.remove(path, filenames, recursive)
            .then(handleFetch(resolve, reject).xthen)
            .catch(handleFetch(resolve, reject).xcatch)
    })
};

/**
 * Wrap API response for move file or folder
 * @param {String} path
 * @param {Array} filenames
 * @param {Boolean} recursive
 * @returns {Object}
 */
export const moveItems = (path, destination, filenames) => {
    path = fixPath(path);
    destination = fixPath(destination);
    return new Promise((resolve, reject) => {
        if (! filenames.length) {
            return reject('No files to move');
        }
        return API.move(path, destination, filenames)
            .then(handleFetch(resolve, reject).xthen)
            .catch(handleFetch(resolve, reject).xcatch)
    })
};

/**
 * Wrap API response for copy file or folder
 * @param {String} path
 * @param {Array} filenames
 * @param {Boolean} recursive
 * @returns {Object}
 */
export const copyItems = (path, destination, filenames) => {
    path = fixPath(path);
    destination = fixPath(destination);
    return new Promise((resolve, reject) => {
        if (! filenames.length) {
            return reject('No files to copy');
        }
        return API.copy(path, destination, filenames)
            .then(handleFetch(resolve, reject).xthen)
            .catch(handleFetch(resolve, reject).xcatch)
    })
};

/**
 * Wrap API response for upload files
 * @param {String} path
 * @param {Object<FileList>} fileList
 * @returns {Object}
 */
export const uploadFiles = (path, fileList) => {
    path = fixPath(path);

    return new Promise((resolve, reject) => {
        if (! fileList.length) {
            return reject('No files to upload');
        }
        return API.upload(path, fileList)
            .then(handleFetch(resolve, reject).xthen)
            .catch(handleFetch(resolve, reject).xcatch)
    })
};

/**
 * Calculate available actions for a file
 * @param {Object} file
 * @returns {Array<String>}
 */
export const getActionsByFile = (file, acts = []) => {
    if (file.type === 'dir') {
        acts.push('open');

        typeof file.compressible !== 'undefined' ?
            file.compressible && acts.push('compress'):
            acts.push('compress');
    }

    if (file.type === 'file') {
        acts.push('download');
        config.isImageFilePattern.test(file.name) && acts.push('open');

        typeof file.editable !== 'undefined' ?
            file.editable && acts.push('edit'):
            config.isEditableFilePattern.test(file.name) && acts.push('edit');
        
        typeof file.extractable !== 'undefined' ?
            file.extractable && acts.push('extract'):
            config.isExtractableFilePattern.test(file.name) && acts.push('extract');

        acts.push('copy');
    }

    acts.push('move');
    acts.push('rename');
    acts.push('perms');
    acts.push('remove');

    return acts;
}

/**
 * Calculate available actions for selected files, excluding non coincidences
 * @param {Array<Object>} files
 * @returns {Array<String>}
 */
export const getActionsByMultipleFiles = (files, acts = []) => {
    files.forEach(file => {
        const fileActs = getActionsByFile(file);
        // intersects previous actions with the following to leave only coincidences
        acts = acts.length ? acts.filter(value => -1 !== fileActs.indexOf(value)) : fileActs;
    });

    if (files.length > 1) {
        acts.splice(acts.indexOf('open'), acts.indexOf('open') >= 0);
        acts.splice(acts.indexOf('edit'), acts.indexOf('edit') >= 0);
        acts.splice(acts.indexOf('compress'), acts.indexOf('compress') >= 0);
        acts.splice(acts.indexOf('download'), acts.indexOf('download') >= 0);
        acts.splice(acts.indexOf('rename'), acts.indexOf('rename') >= 0);
        acts.push('compress');
    }
    return acts;
}

/**
 * Calculate file size by bytes in human readable format
 * @param {Number} bytes
 * @returns {String}
 */
export const getHumanFileSize = (bytes) => {
    const e = (Math.log(bytes) / Math.log(1e3)) | 0;
    return +(bytes / Math.pow(1e3, e)).toFixed(2) + ' ' + ('kMGTPEZY'[e - 1] || '') + 'B';
};