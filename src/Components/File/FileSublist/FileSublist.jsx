import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    setSelectedFolderSublist, enterToDirectorySublist, 
    refreshFileListSublist 
} from '../../../Actions/Actions.js';

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import blue from '@material-ui/core/colors/blue';
import '../File.css';

const styles = theme => ({
});


class FileSublist extends Component {
    render() {
        const { type, name, handleClick, isSelected, handleDoubleClick } = this.props;
        const avatarStyle = {
            backgroundColor: isSelected ? blue['A200'] : null
        };
        return (
            <div className="File" onClick={handleClick} data-selected={isSelected} onDoubleClick={handleDoubleClick}>
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
        isSelected: state.selectedFolderSublist && (state.selectedFolderSublist.name === ownState.name)
    };
};

const mapDispatchToProps = (dispatch, ownState) => {
    return {
        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleDoubleClick: (event) => {
            dispatch(enterToDirectorySublist(ownState.name));
            dispatch(setSelectedFolderSublist(null));
            dispatch(refreshFileListSublist());
        },

        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleClick: (event) => {
            event.stopPropagation(); 
            dispatch(setSelectedFolderSublist(ownState));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FileSublist));

