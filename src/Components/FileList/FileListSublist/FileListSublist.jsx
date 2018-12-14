import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileSublist from '../../File//FileSublist/FileSublist.jsx'; 
import Loader from '../../Loader/Loader.jsx'; 
import FileListEmptyMessage from '../FileListEmptyMessage';
import './FileListSublist.css'; 

class FileListSublist extends Component {
    render() {
        const { fileList, loadingSublist } = this.props;
        
        const fileListComponent = fileList.map((file, key) => {
            return <FileSublist type={file.type} name={file.name} key={key} />
        });

        return <div className="FileListSublist">
            { loadingSublist ? 
                <Loader /> : 
                fileListComponent.length ? fileListComponent : <FileListEmptyMessage />
            }
        </div>
    }
}

const mapStateToProps = (state) => {
    const filteredList = state.fileListSublist
        .filter(file => file.type === 'dir')
        .filter(file => state.path.join('').trim() === state.pathSublist.join('').trim() ? 
            !state.selectedFiles.find(f => f.name === file.name) : true
        );

    return {
        fileList: filteredList,
        loadingSublist: state.loadingSublist,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileListSublist);