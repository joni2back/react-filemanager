import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BreadcrumbText.css';

class BreadcrumbText extends Component {

    render() {
        const { handleClickPath, path, rootTitle } = this.props;

        const separator = <span>&gt;</span>;
        const rootPath = <span onClick={(e) => handleClickPath(e, -1, path)} data-index={0}>
            { rootTitle } { path.length ? separator : '' }
        </span>;

        const directories = path.map((dir, index) => {
            return <span key={index} data-index={index} onClick={(e) => handleClickPath(e, index, path)}>
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
    };
};

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbText);
