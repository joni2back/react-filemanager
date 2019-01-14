import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { initSubList, setVisibleDialogCopy } from '../../../Actions/Actions.js';

function CopyAction(props) {
    const {handleClick, selectedFiles} = props;

    return (
        <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
            <ListItemIcon>
                <FileCopyIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Copy
            </Typography>
        </MenuItem>        
    );
}

const mapStateToProps = (state) => {
    return {
        selectedFiles: state.selectedFiles
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClick: (event, selectedFiles) => {
            dispatch(initSubList());
            dispatch(setVisibleDialogCopy(true));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyAction);
