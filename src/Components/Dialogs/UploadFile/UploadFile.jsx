import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { resetFileUploader, uploadFiles, setFileUploadList } from '../../../Actions/Actions.js';
import FileUploader from '../../FileUploader/FileUploader.jsx';

class FormDialog extends Component {

    render() {
        const { handleClose, handleReset, handleUpload, open, canUpload, fileUploadProgress, fileUploadList, handleSelectedFiles } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-upload" fullWidth={true} maxWidth={'sm'}>
                <form>
                    <DialogTitle id="form-dialog-upload">
                        Upload files
                    </DialogTitle>
                    <DialogContent>
                        <FileUploader handleUpload={handleUpload} fileUploadList={fileUploadList} handleSelectedFiles={handleSelectedFiles} handleReset={handleReset}/>
                        {canUpload ? <LinearProgress variant="determinate" value={fileUploadProgress} /> : null }
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
    return {
        open: state.visibleDialogUploadFile,
        canUpload: state.fileUploadList.length,
        fileUploadList: state.fileUploadList,
        fileUploadProgress: state.fileUploadProgress
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(resetFileUploader());
        },
        handleUpload: (event) => {
            event.preventDefault();
            const files = event.currentTarget.form.querySelector('input[type=file]').files;
            dispatch(uploadFiles(files));
        },
        handleSelectedFiles: (event) => {
            dispatch(setFileUploadList(
                [...event.target.files].map(f => ({name: f.name, size: f.size}))
            ));
        },
        handleReset: (event) => {
            dispatch(setFileUploadList([]));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
