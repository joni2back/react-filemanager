import { list, createDirectory, getFileContent, remove, move, copy, upload } from './Api.js';
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
            const isJson = /(application|text)\/json/.test(contentType);

            if (! response.ok) {
                if (isJson) {
                    throw response.json();
                }
                throw Error(messageTranslation['unknown_response']);
            }

            if (isJson) {
                response.json().then(json => {
                    resolve(json);
                });
            } else {
                // is file content to view
                response.blob().then(blob => {
                    return resolve(blob);
                });
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
        return list(path)
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
        return getFileContent(path)
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
        return createDirectory(path, folder)
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
export const removeFile = (path, filenames, recursive = true) => {
    path = fixPath(path);
    return new Promise((resolve, reject) => {
        return remove(path, filenames, recursive)
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
export const moveFile = (path, destination, filenames) => {
    path = fixPath(path);
    destination = fixPath(destination);
    return new Promise((resolve, reject) => {
        return move(path, destination, filenames)
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
export const copyFile = (path, destination, filenames) => {
    path = fixPath(path);
    destination = fixPath(destination);
    return new Promise((resolve, reject) => {
        return copy(path, destination, filenames)
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
        return upload(path, fileList)
            .then(handleFetch(resolve, reject).xthen)
            .catch(handleFetch(resolve, reject).xcatch)
    })
};

/**
 * Calculate available actions for a file
 * @param {String} filename
 * @param {String} type
 * @returns {Array<String>}
 */
export const getActionsByFile = (filename, type, acts = []) => {
    if (type === 'dir') {
        acts.push('open');
        acts.push('compress');
    }

    if (type === 'file') {
        acts.push('download');
        config.isImageFilePattern.test(filename) && acts.push('open');
        config.isEditableFilePattern.test(filename) && acts.push('edit');
        config.isExtractableFilePattern.test(filename) && acts.push('extract');
        acts.push('copy');
    }

    acts.push('move');
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
    files.forEach(f => {
        const fileActs = getActionsByFile(f.name, f.type);
        // intersects previous actions with the following to leave only coincidences
        acts = acts.length ? acts.filter(value => -1 !== fileActs.indexOf(value)) : fileActs;
    });

    if (files.length > 1) {
        acts.splice(acts.indexOf('open'), acts.indexOf('open') >= 0);
        acts.splice(acts.indexOf('edit'), acts.indexOf('edit') >= 0);
        acts.splice(acts.indexOf('compress'), acts.indexOf('compress') >= 0);
        acts.splice(acts.indexOf('download'), acts.indexOf('download') >= 0);
        acts.push('compress');
    }
    return acts;
}