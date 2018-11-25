import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Breadcrumb.css';

class Breadcrumb extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return <div className="Breadcrumb">
            Current folder: <span>{this.props.dirname}</span>
        </div>
    }
}


const mapStateToProps = (state) => {
    return {
        dirname: state.currentDir
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
