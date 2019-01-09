import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setVisibleModalCopyFile, setSelectedFolderSublist, enterToPreviousDirectorySublist, copyItems } from '../../../Actions/Actions.js';
import FileListSublist from '../../FileList/FileListSublist/FileListSublist.jsx'; 
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

class FormDialog extends Component {

    render() {
        const { handleClose, handleSave, open, selectedFolderSublist, canGoBack, canCopy, selectedFiles, handleGoBack } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-copy" fullWidth={true} maxWidth={'sm'}>
                <form>
                    <DialogTitle id="form-dialog-copy">
                        Copy files to <span style={{color: 'grey'}}>{ selectedFolderSublist ? selectedFolderSublist.name : '' }</span>
                    </DialogTitle>
                    <DialogContent>
                        <FileListSublist />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleGoBack} color="primary" type="button" disabled={!canGoBack}>
                            <KeyboardArrowLeftIcon /> Go back directory
                        </Button>

                        <Button onClick={handleClose} color="primary" type="button">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={(e) => handleSave(e, selectedFiles)} disabled={!canCopy} type="submit">
                            Copy
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    // prevent copying to same folder
    const canCopy = state.path.join('') !== state.pathSublist.join('') + (state.selectedFolderSublist ? state.selectedFolderSublist.name : '');

    return {
        open: state.visibleModalCopyFile,
        selectedFolderSublist: state.selectedFolderSublist,
        canGoBack: state.pathSublist.length,
        canCopy: state.selectedFolderSublist && canCopy,
        selectedFiles: state.selectedFiles
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(setVisibleModalCopyFile(false));
        },
        handleSave: (event, selectedFiles) => {
            dispatch(copyItems(selectedFiles));
        },
        handleGoBack: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(enterToPreviousDirectorySublist());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
