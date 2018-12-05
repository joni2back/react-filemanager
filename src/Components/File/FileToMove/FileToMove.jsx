import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSelectedFolderToMove } from '../../../Actions/Actions.js';

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import '../File.css';

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


class FileToMove extends Component {
    render() {
        const { type, name, handleClick, isSelected } = this.props;

        return (
            <div className="File" onClick={handleClick} data-selected={isSelected}>
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
        isSelected: state.selectedFolderToMove && (state.selectedFolderToMove.name === ownState.name)
    };
};

const mapDispatchToProps = (dispatch, ownState) => {
    return {

        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleClick: (event) => {
            event.stopPropagation(); 
            dispatch(setSelectedFolderToMove(ownState));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FileToMove));

