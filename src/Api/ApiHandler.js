import { list, createDirectory, getFileContent, remove } from './Api.js';

const messageTranslation = {
    'TypeError: Failed to fetch': 'Cannot get a response from connector.',
};

const handleFetch = (resolve, reject) => {
    return {
        xthen: (response) => {
            const contentType = response.headers.get("content-type");
            if (! response.ok) {
                throw response.json();
            }

            if (/(application|text)\/json/.test(contentType)) {
                response.json().then(json => {
                    return resolve(json);
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
 * Wrap API response for retrive file liest
 * @param {String} path
 * @returns {Object}
 */
export const getFileList = (path) => {
    path = '/' + path;
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
    path = '/' + path + '/' + filename;
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
    path = '/' + path;
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
    path = '/' + path;
    return new Promise((resolve, reject) => {
        return remove(path, filenames, recursive)
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
export const getActionsByFile = (filename, type) => {
    const regex = {
        isEditableFilePattern: /\.(txt|diff?|patch|svg|asc|cnf|cfg|conf|html?|cfm|cgi|aspx?|ini|pl|py|md|css|cs|jsx?|jsp|log|htaccess|htpasswd|gitignore|gitattributes|env|json|atom|eml|rss|markdown|sql|xml|xslt?|sh|rb|as|bat|cmd|cob|for|ftn|frm|frx|inc|lisp|scm|coffee|php[3-6]?|java|c|cbl|go|h|scala|vb|tmpl|lock|go|yml|yaml|tsv|lst)$/i,
        isImageFilePattern: /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i,
        isExtractableFilePattern: /\.(gz|tar|rar|g?zip)$/i,
    };

    let acts = [];
    if (type === 'dir') {
        acts.push('open');
        acts.push('compress');
    }

    if (type === 'file') {
        (regex.isImageFilePattern.test(filename) || regex.isEditableFilePattern.test(filename)) && acts.push('open');
        acts.push('download');
        regex.isEditableFilePattern.test(filename) && acts.push('edit');
        regex.isExtractableFilePattern.test(filename) && acts.push('extract');
        acts.push('copy');
    }

    acts.push('move');
    acts.push('perms');
    acts.push('remove');

    return acts;
}