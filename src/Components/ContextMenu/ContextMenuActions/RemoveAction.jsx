import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { removeItems } from '../../../Actions/Actions.js';

function RemoveAction(props) {
    const {handleClick, selectedFiles} = props;
    return (
        <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>Remove</MenuItem>
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
            dispatch(removeItems(selectedFiles));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveAction);
