import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import { getHumanFileSize } from '../../Api/ApiHandler';

function UploadFileList(props) {
    const { files } = props;
    const list = files.map((f, i) =>
        <ListItem dense key={i}>
            <ListItemIcon>
                <FileIcon />
            </ListItemIcon>
            <ListItemText primary={`${f.name} (${getHumanFileSize(f.size)})`} />
        </ListItem>
    );

    return (
        <div>
            <List component="nav">
                {list}
            </List>
        </div>
    );
}

UploadFileList.propTypes = {
    files: PropTypes.array.isRequired
};

export default UploadFileList;
