import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setVisibleModalUploadFile, uploadFiles } from '../../../Actions/Actions.js';
import FileUploader from '../../FileUploader/FileUploader.jsx';

class FormDialog extends Component {

    render() {
        const { handleClose, handleUpload, open, canUpload } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form>
                    <DialogTitle id="form-dialog-title">
                        Upload files
                    </DialogTitle>
                    <DialogContent>
                        <FileUploader handleUpload={handleUpload} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" type="button">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={handleUpload} disabled={!canUpload} type="submit">
                            Upload
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    // prevent moving to same folder
    const canMove = state.path.join('') !== state.pathSublist.join('') + (state.selectedFolderSublist ? state.selectedFolderSublist.name : '');

    return {
        open: state.visibleModalUploadFile,
        canUpload: true,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setVisibleModalUploadFile(false));
        },
        handleUpload: (event, selectedFiles) => {
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
