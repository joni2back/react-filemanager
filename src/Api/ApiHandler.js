import { list } from './Api.js';

export function getFileList(path) {
    return new Promise((resolve, reject) => {
        return list('/' + path).then(r => {
            if (! r.ok) {
                return reject(r);
            }
            return r.json();
        }).then(json => {
            resolve(json);
        }).catch(r => {
            return reject(r);
        });

    })
};

