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
        const { submitForm, handleClose, handleSave, value, open } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-create-folder" fullWidth={true} maxWidth={'sm'}>
                <form>
                  <DialogTitle id="form-dialog-create-folder">Create folder</DialogTitle>
                  <DialogContent>
                    <TextField autoFocus fullWidth margin="dense" label="Folder name" type="text" value={value} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary" type="button">
                      Cancel
                    </Button>
                    <Button color="primary" type="submit" onClick={handleSave}>
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
        handleClose: event => {
            dispatch(setVisibleModalCreateFolder(false));
        },
        handleSave: event => {
            event.preventDefault();
            const folderName = event.currentTarget.form.querySelector('input').value;
            dispatch(createNewFolder(folderName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
