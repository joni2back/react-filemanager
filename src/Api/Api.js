/**
 * Fetch API to list files from directory
 * @param {String} path
 * @returns {Object}
 */
export function list(path) {
    return fetch('http://localhost:8000/filemanager/list?path=' + (encodeURIComponent(path) || '/'));
};


/**
 * Fetch API to create a directory
 * @param {String} path
 * @param {String} directory
 * @returns {Object}
 */
export function createDirectory(path, directory) {
    return fetch('http://localhost:8000/filemanager/create/dir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path, directory
        })
    });
};
