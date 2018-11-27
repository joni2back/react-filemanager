import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContextMenu.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

class ContextMenu extends Component {

    render() {
        return (
            <Menu style={{top: this.props.y, left: this.props.x}}
              id="simple-menu"
              open={this.props.visible}
              onClose={ () => {} }
              PaperProps={{ style: {width: 160} }}>
              <MenuItem>Open</MenuItem>
              <MenuItem>Copy</MenuItem>
              <MenuItem>Delete</MenuItem>
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    window.state = state;
    return {
        x: state.contextMenuPosition[0] -20|| 0,
        y: state.contextMenuPosition[1] -50|| 0,
        visible: !!state.contextMenuVisible
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
