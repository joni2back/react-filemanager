import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
            this.state.lastBlobUrl = this.props.blobUrl;
            this.setState({
                loading: true
            });

            this.state.lastBlobUrl && fetch(this.state.lastBlobUrl).then(r => {
                return r.text();
            }).then(t => {
                this.setState({
                    content: t
                });
                this.setState({
                    loading: false
                });
            });
        }
    }

    render() {
        const { handleClose, open } = this.props;

        return (
          <div style={{marginLeft:'1em'}}>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">File Content</DialogTitle>
              <DialogContent>
                {this.state.loading ? '...' : this.state.content}
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
