import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { setVisibleDialogCreateFolder } from '../../../Actions/Actions.js';

function CreateFolderAction(props) {
    const {handleClick, handleClose} = props;

    const handleCloseAfter = (callback) => (event) => {
        callback();
        handleClose();
    };

    return (
        <MenuItem onClick={handleCloseAfter(handleClick)}>
            <ListItemIcon>
                <CreateNewFolderIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Create folder
            </Typography>
        </MenuItem>        
    );
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClick: (event) => {
            dispatch(setVisibleDialogCreateFolder(true));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFolderAction);
