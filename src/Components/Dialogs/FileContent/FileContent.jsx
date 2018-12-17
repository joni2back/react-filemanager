import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setVisibleModalFileContent } from '../../../Actions/Actions.js';

class FormDialog extends Component {

    state = {
        lastBlobUrl: null,
        content: '...',
        loading: false
    };

    componentDidUpdate() {
        if (this.props.blobUrl !== this.state.lastBlobUrl) {
            this.setState({
                lastBlobUrl: this.props.blobUrl
            });
            this.setState({
                loading: true
            });
        }
    }

    render() {
        const { handleClose, open } = this.props;
        return (
          <div style={{marginLeft:'1em'}}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Viewing file </DialogTitle>
              <DialogContent>
                <img src={this.props.blobUrl} alt="" style={{maxWidth: '100%'}}/>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" type="button">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.visibleModalFileContent,
        blobUrl: state.fileContentBlobUrl
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setVisibleModalFileContent(false));
        },
        handleOpen: (event) => {
            dispatch(setVisibleModalFileContent(true));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
