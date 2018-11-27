import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Breadcrumb.css';
import {setPath, refreshFileList} from '../../Actions/Actions.js';

class Breadcrumb extends Component {

    render() {
        const { handleClick, path } = this.props;

        const separator = <span>&gt;</span>;
        const rootPath = <a onClick={(e) => handleClick(e, -1, path)} data-index={0}>
            React Filemanager { path.length ? separator : '' }
        </a>;

        const directories = path.map((dir, index) => {
            return <a key={index} data-index={index} onClick={(e) => handleClick(e, index, path)}>
                <span>{dir}</span> { path.length -1 != index ? separator : '' }
            </a>
        });

        return <div className="Breadcrumb">
            {rootPath} {directories} 
        </div>
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (event, index, path) => {
            event.preventDefault();

            let newPath = Array.from(path);
            newPath.splice(++index)
            dispatch(setPath(newPath));
            dispatch(refreshFileList());
        },
    };
};

const mapStateToProps = (state) => {
    return {
        path: state.path
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
