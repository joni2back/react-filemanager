import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setVisibleModalMoveFile } from '../../../Actions/Actions.js';
import FileListToMove from '../../FileList/FileListToMove/FileListToMove.jsx'; 

class FormDialog extends Component {

    render() {
        const { handleChange, handleClose, handleSave, value, open } = this.props;

        return (
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title">
                <form onSubmit={handleSave}>
                  <DialogTitle id="form-dialog-title">Move files to</DialogTitle>
                  <DialogContent>
                    <FileListToMove />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary" type="button">
                      Cancel
                    </Button>
                    <Button color="primary" onClick={handleSave} type="submit">
                      Move
                    </Button>
                  </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.visibleModalMoveFile
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setVisibleModalMoveFile(false));
        },
        handleSave: (event) => {
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
