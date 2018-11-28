import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContextMenu.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

class ContextMenu extends Component {

    render() {
        const { anchorEl, acts, y, x, visible, title } = this.props;
        const actionsComp = acts.map((act, key) => <MenuItem key={key}>{act}</MenuItem>);

        return (
            <div>
                <Menu
                    anchorEl={anchorEl} 
                    oldStyle={{top: y, left: x}} 
                    open={visible} 
                    onClose={ () => {} } 
                    PaperProps={{ style: {width: 160} }}>
                    { actionsComp }
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        x: state.contextMenuPosition[0] -20|| 0,
        y: state.contextMenuPosition[1] -50|| 0,
        visible: !!state.contextMenuVisible,
        title: state.selectedFiles,
        acts: ['open', 'remove', 'view','edit', 'compress'],
        anchorEl: state.contextMenuPositionElement
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
