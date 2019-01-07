import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import UploadFileList from './UploadFileList';

class FileUploader extends Component {

    handleReset(event) {
        this.refs.inputfile.value = '';
        this.props.handleReset(event);
    }

    render() {
        const { fileUploadList, handleSelectedFiles } = this.props;
        const styles = {
            inputfile: {
                display: 'none'
            }, inputreset: {
                display: fileUploadList.length ? 'inline-flex' : 'none'
            }
        }

        return (
            <div>
                <label htmlFor="button-file">
                    <input style={styles.inputfile} id="button-file" ref="inputfile" multiple type="file" onChange={handleSelectedFiles} />
                    <Button component="span" variant="contained" color="primary">
                        Select Files
                    </Button>
                </label>

                <Button style={styles.inputreset} component="span" type="reset" onClick={this.handleReset.bind(this)}>
                    Clear
                </Button>

                <UploadFileList files={fileUploadList} />
            </div>
        );
    }
}

FileUploader.propTypes = {
    fileUploadList: PropTypes.array.isRequired,
    handleReset: PropTypes.func.isRequired,
    handleSelectedFiles: PropTypes.func.isRequired,
};

export default FileUploader;
