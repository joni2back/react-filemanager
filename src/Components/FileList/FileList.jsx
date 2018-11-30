import React, { Component } from 'react';
import File from '../File/File.jsx'; 
import { connect } from 'react-redux';
import './FileList.css';
import Loader from '../Loader/Loader.jsx'; 
import NotificationBar from '../Notification/NotificationBar.jsx'; 

class FileList extends Component {
    render() {
        const { fileList, loading } = this.props;
        const fileListComponent = fileList.map((file, key) => {
            return <File type={file.type} name={file.name} key={key} />
        });

        return <div className="FileList">
            <NotificationBar />
            { fileListComponent.length ? '' : '' }
            { loading ? <Loader /> : fileListComponent }
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


