import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setVisibleModalMoveFile, setSelectedFolderSublist, enterToPreviousDirectorySublist, moveItems } from '../../../Actions/Actions.js';
import FileListSublist from '../../FileList/FileListSublist/FileListSublist.jsx'; 
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

class FormDialog extends Component {

    render() {
        const { pathSublist, handleClose, handleSave, open, selectedFiles, selectedFolderSublist, canGoBack, canMove, handleGoBack } = this.props;
        const selectedPath = selectedFolderSublist ? pathSublist.join('/') + '/' + selectedFolderSublist.name : '';
        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-move" fullWidth={true} maxWidth={'sm'}>
                <form>
                    <DialogTitle id="form-dialog-move">
                        Move files to <small style={{color: 'grey'}}>{ selectedPath }</small>
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
                        <Button color="primary" onClick={(e) => handleSave(e, selectedFiles)} disabled={!canMove} type="submit">
                            Move
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
        open: state.visibleModalMoveFile,
        selectedFolderSublist: state.selectedFolderSublist,
        canGoBack: state.pathSublist.length,
        pathSublist: state.pathSublist,
        canMove: state.selectedFolderSublist && canMove,
        selectedFiles: state.selectedFiles
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(setVisibleModalMoveFile(false));
        },
        handleSave: (event, selectedFiles) => {
            dispatch(moveItems(selectedFiles));
        },
        handleGoBack: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(enterToPreviousDirectorySublist());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
