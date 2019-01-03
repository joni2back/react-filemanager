import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import {  } from '../../Actions/Actions.js';

class FileUploader extends Component {

    state = { selectedFiles: [] }

    humanReadableFileSize(bytes) {
        const e = (Math.log(bytes) / Math.log(1e3)) | 0;
        return +(bytes / Math.pow(1e3, e)).toFixed(2) + ' ' + ('kMGTPEZY'[e - 1] || '') + 'B';
    }

    handleSelectedFile = event => {
        this.setState({
            selectedFiles: [...event.target.files]
        });
    }

    render() {
        const { classes } = this.props;
        const filesComp = this.state.selectedFiles.map(f =>
            <li key={f.name}>
                <span>
                    {f.name} ({this.humanReadableFileSize(f.size)})
                </span>
            </li>
        );

        return (
            <div>
                <input 
                    style={{display:'none'}} id="contained-button-file" 
                    multiple type="file" onChange={this.handleSelectedFile}
                />
                
                <label htmlFor="contained-button-file">
                    <Button component="span">
                        Select Files
                    </Button>
                </label>

                <ul>
                    { filesComp }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uploadProgress: state.uploadProgress || 0
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
