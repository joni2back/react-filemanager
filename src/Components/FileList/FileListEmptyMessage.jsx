import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FileListEmptyMessage.css';

class FileListEmptyMessage extends Component {
    render() {
        return (
            <div className="FileListEmptyMessage">
                No files in this folder
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileListEmptyMessage);


