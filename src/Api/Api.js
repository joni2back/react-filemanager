import config from './../config.js';

/**
 * Fetch API to list files from directory
 * @param {String} path
 * @returns {Object}
 */
export function list(path) {
    return fetch(config.url_list + '?path=' + (encodeURIComponent(path) || '/'));
};


/**
 * Fetch API to create a directory
 * @param {String} path
 * @param {String} directory
 * @returns {Object}
 */
export function createDirectory(path, directory) {
    return fetch(config.url_create_folder, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path, directory
        })
    });
};


/**
 * Fetch API to get file body
 * @param {String} path
 * @returns {Object}
 */
export function getFileContent(path) {
    return fetch(config.url_get_content + '?path=' + (encodeURIComponent(path) || '/'));
};
