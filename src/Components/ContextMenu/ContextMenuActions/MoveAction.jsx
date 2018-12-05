import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { getFileContent, enterToDirectory, refreshFileList } from '../../../Actions/Actions.js';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { setVisibleModalMoveFile } from '../../../Actions/Actions.js';


function MoveAction(props) {
    const {handleClick, selectedFiles} = props;

    return (
        <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
            <ListItemIcon>
                <HowToVoteIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Move
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
            dispatch(setVisibleModalMoveFile(true));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveAction);
