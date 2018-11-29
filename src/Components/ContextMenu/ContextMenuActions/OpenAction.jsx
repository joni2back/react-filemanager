import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFileContent, enterToDirectory, refreshFileList } from '../../../Actions/Actions.js';

function OpenAction(props) {
    const {handleClick, selectedFiles} = props;
    return (
        <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>Open</MenuItem>
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
            if (selectedFiles[0].type === 'dir') {
                dispatch(enterToDirectory(selectedFiles[0].name));
                dispatch(refreshFileList());
                return;
            }
            dispatch(getFileContent(selectedFiles[0].name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenAction);
