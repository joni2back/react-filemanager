import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { renameItem, setVisibleDialogRename } from '../../../Actions/Actions.js';

class FormDialog extends Component {

    state = {
        value: ''
    };

    componentWillReceiveProps (props) {
        this.setState({value: props.realName});
    }

    handleChange (event) {
        this.setState({value: event.currentTarget.form.querySelector('input').value});
    }

    handleSave (event) {
        this.props.handleSave(event)(this.props.realName, this.state.value);
    }

    render() {
        const { value } = this.state;
        const { handleClose, open } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-create-folder" fullWidth={true} maxWidth={'sm'}>
                <form>
                  <DialogTitle id="form-dialog-create-folder">Rename</DialogTitle>
                  <DialogContent>
                    <TextField autoFocus fullWidth margin="dense" label="Item name" type="text" onChange={this.handleChange.bind(this)} value={value} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary" type="button">
                      Cancel
                    </Button>
                    <Button color="primary" type="submit" onClick={this.handleSave.bind(this)}>
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
        open: state.visibleDialogRename,
        realName: state.selectedFiles.length ? state.selectedFiles[0].name : ''
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: event => {
            dispatch(setVisibleDialogRename(false));
        },
        handleSave: event => (realName, newName) => {
            event.preventDefault();
            dispatch(renameItem(realName, newName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
