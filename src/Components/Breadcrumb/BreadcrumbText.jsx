import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPath, refreshFileList } from '../../Actions/Actions.js';
import './BreadcrumbText.css';

class BreadcrumbText extends Component {

    render() {
        const { handleClick, path } = this.props;

        const separator = <span>&gt;</span>;
        const rootPath = <span onClick={(e) => handleClick(e, -1, path)} data-index={0}>
            React Filemanager { path.length ? separator : '' }
        </span>;

        const directories = path.map((dir, index) => {
            return <span key={index} data-index={index} onClick={(e) => handleClick(e, index, path)}>
                <span>{dir}</span> { path.length -1 !== index ? separator : '' }&nbsp;
            </span>
        });

        return (
            <div className="BreadcrumbText">{rootPath} {directories}</div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {

        /**
         * @param {Object} event
         * @param {Number} index
         * @param {Array} path
         * @returns {undefined}
         */
        handleClick: (event, index, path) => {
            let newPath = Array.from(path);
            newPath.splice(++index);
            dispatch(setPath(newPath));
            dispatch(refreshFileList());
            event.preventDefault();
        },
    };
};

const mapStateToProps = (state) => {
    return {
        path: state.path
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbText);
