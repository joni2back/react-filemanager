const host = 'http://localhost:8000';

export default {
    url_list: `${host}/filemanager/list`,
    url_create_folder: `${host}/filemanager/dir/create`,
    url_get_content: `${host}/filemanager/file/content`,
    url_download: `${host}/filemanager/file/content`,
    url_upload: `${host}/filemanager/items/upload`,
    url_remove: `${host}/filemanager/items/remove`,
    url_rename: `${host}/filemanager/item/move`,
    url_move: `${host}/filemanager/items/move`,
    url_copy: `${host}/filemanager/items/copy`,
    url_edit: `${host}/filemanager/file/edit`,
    url_compress: `${host}/filemanager/items/compress`,
    url_extract: `${host}/filemanager/file/extract`,

    isEditableFilePattern: /\.(txt|diff?|patch|svg|asc|cnf|cfg|conf|html?|cfm|cgi|aspx?|ini|pl|py|md|css|cs|jsx?|jsp|log|htaccess|htpasswd|gitignore|gitattributes|env|json|atom|eml|rss|markdown|sql|xml|xslt?|sh|rb|as|bat|cmd|cob|for|ftn|frm|frx|inc|lisp|scm|coffee|php[3-6]?|java|c|cbl|go|h|scala|vb|tmpl|lock|go|yml|yaml|tsv|lst)$/i,
    isImageFilePattern: /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i,
    isExtractableFilePattern: /\.(gz|tar|rar|g?zip)$/i,

    actions: {
        create_folder: true,
        move: true,
        copy: true,
        copy_folder: true,
        compress: true,
        extract: true,
        edit: true,
        remove: true,
        upload: true,
        upload_by_chunks: true,
        preview_images: true,
    }
};
