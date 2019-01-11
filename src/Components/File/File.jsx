import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    enterToDirectory, setContextMenuVisible, toggleSelectedFile, setContextMenuPosition,
    setSelectedFileFromLastTo, getFileContent, getFileContentForEdit, 
    rightClickOnFile, setSelectedFiles
} from '../../Actions/Actions.js';
import './File.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import blue from '@material-ui/core/colors/blue';
import config from '../../config.js';

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
                    <ListItemText className="filename" primary={name} secondary="" />
                </ListItem>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        filePath: [...state.path, ownProps.name],
        isSelected: !!state.selectedFiles.find(f => f.name === ownProps.name)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleDoubleClick: (event) => {
            if (ownProps.type === 'file') {
                if (config.isEditableFilePattern.test(ownProps.name) || ownProps.editable) {
                    dispatch(getFileContentForEdit(ownProps.name));
                } else if (config.isImageFilePattern.test(ownProps.name)) {
                    dispatch(getFileContent(ownProps.name));
                }
                return;
            }

            dispatch(enterToDirectory(ownProps.name));
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
                dispatch(setSelectedFileFromLastTo(ownProps));
            } else {
                dispatch(rightClickOnFile(ownProps));
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
                dispatch(toggleSelectedFile(ownProps));
            } else if (event.shiftKey) {
                dispatch(setSelectedFileFromLastTo(ownProps));
            } else {
                dispatch(setSelectedFiles([ownProps]));
            }
        }
    };
};

File.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    editable: PropTypes.oneOfType([
        PropTypes.bool, PropTypes.number
    ])
};

export default connect(mapStateToProps, mapDispatchToProps)(File);

