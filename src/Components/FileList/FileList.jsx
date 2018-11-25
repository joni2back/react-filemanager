import React, { Component } from 'react';
import File from '../File/File.jsx'; 
import { connect } from 'react-redux';
import './FileList.css';

class FileList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { fileList } = this.props;
        const fileListComponent = fileList.map((file, key) => {
            return <File type={file.type} name={file.name} key={key} />
        });
        return <div className="FileList">
            {fileListComponent}
        </div>
    }
}


const mapStateToProps = (state) => {
    return {
        fileList: state.fileList.filter(file => state.fileListFilter ? file.name.match(state.fileListFilter) : true),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (event) => {
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileList);


