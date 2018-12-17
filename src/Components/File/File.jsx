import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    enterToDirectory, setContextMenuVisible, toggleSelectedFile, setContextMenuPosition,
    setSelectedFileFromLastTo, getFileContent, getFileContentForEdit, 
    rightClickOnFile, setSelectedFiles
} from '../../Actions/Actions.js';
import './File.css';

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import blue from '@material-ui/core/colors/blue';
import config from '../../config.js';

const styles = theme => ({
});

class File extends Component {
    render() {
        const { isSelected, type, name, handleClick, handleDoubleClick, handleContextMenu } = this.props;
        const avatarStyle = {
            backgroundColor: isSelected ? blue['A200'] : null
        };
        return (
            <div className="File" onClick={handleClick} onDoubleClick={handleDoubleClick} onContextMenu={handleContextMenu} data-selected={isSelected}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar style={avatarStyle}>
                            { type === 'dir' ? <FolderIcon /> : <FileIcon />}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={name} secondary="" />
                </ListItem>
            </div>
        );
    }
}


const mapStateToProps = (state, ownState) => {
    return {
        filePath: [...state.path, ownState.name],
        isSelected: !!state.selectedFiles.find(f => f.name === ownState.name)
    };
};

const mapDispatchToProps = (dispatch, ownState) => {
    return {
        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleDoubleClick: (event) => {
            if (ownState.type === 'file') {
                if (config.isEditableFilePattern.test(ownState.name)) {
                    dispatch(getFileContentForEdit(ownState.name));
                } else if (config.isImageFilePattern.test(ownState.name)) {
                    dispatch(getFileContent(ownState.name));
                }
                return;
            }

            dispatch(enterToDirectory(ownState.name));
        },

        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleContextMenu: (event) => {
            event.preventDefault();
            event.stopPropagation();

            const x = event.clientX || (event.touches && event.touches[0].pageX);
            const y = event.clientY || (event.touches && event.touches[0].pageY);

            if (event.shiftKey) {
                dispatch(setSelectedFileFromLastTo(ownState));
            } else {
                dispatch(rightClickOnFile(ownState));
            }
            
            dispatch(setContextMenuVisible(true));
            dispatch(setContextMenuPosition(x, y));
        },

        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleClick: (event) => {
            event.stopPropagation();

            if (event.ctrlKey) {
                dispatch(toggleSelectedFile(ownState));
            } else if (event.shiftKey) {
                dispatch(setSelectedFileFromLastTo(ownState));
            } else {
                dispatch(setSelectedFiles([ownState]));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(File));

