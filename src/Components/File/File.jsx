import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    refreshFileList, enterToDirectory, setContextMenuVisible, 
    setContextMenuPosition, toggleSelectedFile, setContextMenuPositionElement,
    setSelectedFileFromLastTo
} from '../../Actions/Actions.js';
import './File.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteIcon from '@material-ui/icons/Delete';

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

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
class File extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            type: null,
        };
    }

    render() {
        const { selected, filePath, type, name, handleClick, handleDoubleClick, handleContextMenu } = this.props;

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
        filePath: [... state.path, ownState.name],
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

            let x = event.clientX || (event.touches && event.touches[0].pageX);
            let y = event.clientY || (event.touches && event.touches[0].pageY);

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
                dispatch({
                    type: 'SET_SELECTED_FILES',
                    value: [ownState]
                });
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(File));

