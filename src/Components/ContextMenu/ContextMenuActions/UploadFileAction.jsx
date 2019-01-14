import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { setVisibleDialogUploadFile } from '../../../Actions/Actions.js';

function UploadFileAction(props) {
    const {handleClick, handleClose} = props;

    const handleCloseAfter = (callback) => (event) => {
        callback();
        handleClose();
    };

    return (
        <MenuItem onClick={handleCloseAfter(handleClick)}>
            <ListItemIcon>
                <CloudUploadIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Upload files
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
            dispatch(setVisibleDialogUploadFile(true));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFileAction);
