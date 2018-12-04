import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    refreshFileList, enterToDirectory, setContextMenuVisible, 
    toggleSelectedFile, setContextMenuPositionElement,
    setSelectedFileFromLastTo, getFileContent, rightClickOnFile, setSelectedFiles
} from '../../Actions/Actions.js';
import './File.css';

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});


class File extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            type: null,
        };
    }

    render() {
        const { selected, type, name, handleClick, handleDoubleClick, handleContextMenu } = this.props;

        return (
            <div className="File" onClick={handleClick} onDoubleClick={handleDoubleClick} onContextMenu={handleContextMenu} data-selected={selected}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
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
        selected: state.selectedFiles.find(f => f.name === ownState.name)
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
                dispatch(getFileContent(ownState.name));
                return;
            }
            dispatch(enterToDirectory(ownState.name));
            dispatch(refreshFileList());
        },

        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleContextMenu: (event) => {
            event.preventDefault();
            event.stopPropagation();

            // let x = event.clientX || (event.touches && event.touches[0].pageX);
            // let y = event.clientY || (event.touches && event.touches[0].pageY);

            if (event.shiftKey) {
                dispatch(setSelectedFileFromLastTo(ownState));
            } else {
                dispatch(rightClickOnFile(ownState));
            }
            
            dispatch(setContextMenuVisible(true));
            //dispatch(setContextMenuPosition(x, y));
            dispatch(setContextMenuPositionElement(event.currentTarget));
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

