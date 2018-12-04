import React, { Component } from 'react';
import File from '../File/File.jsx'; 
import { connect } from 'react-redux';
import './FileList.css';
import Loader from '../Loader/Loader.jsx'; 

class FileList extends Component {
    render() {
        const { fileList, loading } = this.props;
        const fileListComponent = fileList.map((file, key) => {
            return <File type={file.type} name={file.name} key={key} />
        });
        const fileListEmptyComponent = (
            <div style={{margin:20}}>No files in this folder</div>
        );

        return <div className="FileList">
            { loading ? 
                <Loader /> : 
                fileListComponent.length ? fileListComponent : fileListEmptyComponent
            }
        </div>
    }
}


const mapStateToProps = (state) => {
    return {
        fileList: state.fileList.filter(file => state.fileListFilter ? file.name.toLocaleLowerCase().match(state.fileListFilter.toLocaleLowerCase()) : true),
        loading: state.loading
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (event) => {
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileList);


