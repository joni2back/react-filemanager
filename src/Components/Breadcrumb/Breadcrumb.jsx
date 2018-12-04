import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Breadcrumb.css';
import BreadcrumbText from './BreadcrumbText.jsx';
import {setPath, refreshFileList} from '../../Actions/Actions.js';

class Breadcrumb extends Component {
    render() {
        return <div className="Breadcrumb">
            <BreadcrumbText />
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
