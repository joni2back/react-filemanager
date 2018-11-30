import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { createNewFolder, setVisibleModalCreateFolder } from '../../../Actions/Actions.js';

class FormDialog extends Component {

    render() {
        const { handleChange, handleClose, handleSave, value, open } = this.props;

        return (
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title">
                <form onSubmit={handleSave}>
                  <DialogTitle id="form-dialog-title">Create folder</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Filename"
                      type="text"
                      value={value}
                      onChange={handleChange}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary" type="button">
                      Cancel
                    </Button>
                    <Button color="primary" onClick={handleSave} type="submit">
                      Save
                    </Button>
                  </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        createFolderName: state.createFolderName,
        open: state.visibleModalCreateFolder
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setVisibleModalCreateFolder(false));
        },
        handleSave: (event) => {
            const folderName = event.currentTarget.form.querySelector('input').value;
            dispatch(createNewFolder(folderName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
