import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileToMove from '../../File//FileToMove/FileToMove.jsx'; 
import Loader from '../../Loader/Loader.jsx'; 
import './FileListToMove.css'; 

class FileListToMove extends Component {
    render() {
        const { fileList, loading } = this.props;
        
        const fileListComponent = fileList.map((file, key) => {
            return <FileToMove type={file.type} name={file.name} key={key} />
        });

        const fileListEmptyComponent = (
            <div style={{margin:20}}>No files in this folder</div>
        );

        return <div className="FileListToMove">
            { loading ? 
                <Loader /> : 
                fileListComponent.length ? fileListComponent : fileListEmptyComponent
            }
        </div>
    }
}


const mapStateToProps = (state) => {
    const filteredList = state.fileList.filter(file => file.type === 'dir');
    return {
        fileList: filteredList,
        loading: state.loading
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (event) => {
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileListToMove);