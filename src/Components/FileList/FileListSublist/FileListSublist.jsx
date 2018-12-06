import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileSublist from '../../File//FileSublist/FileSublist.jsx'; 
import Loader from '../../Loader/Loader.jsx'; 
import './FileListSublist.css'; 

class FileListSublist extends Component {
    render() {
        const { fileList, loadingSublist } = this.props;
        
        const fileListComponent = fileList.map((file, key) => {
            return <FileSublist type={file.type} name={file.name} key={key} />
        });

        const fileListEmptyComponent = (
            <div style={{margin:20}}>
                No files in this folder
            </div>
        );

        return <div className="FileListSublist">
            { loadingSublist ? 
                <Loader /> : 
                fileListComponent.length ? fileListComponent : fileListEmptyComponent
            }
        </div>
    }
}


const mapStateToProps = (state) => {
    const filteredList = state.fileListSublist.filter(file => file.type === 'dir');
    return {
        fileList: filteredList,
        loadingSublist: state.loadingSublist
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileListSublist);