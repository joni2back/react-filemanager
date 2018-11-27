export function list(path) {
    return fetch('http://localhost:8000/filemanager/list?path=' + (encodeURIComponent(path) || '/'));
};
