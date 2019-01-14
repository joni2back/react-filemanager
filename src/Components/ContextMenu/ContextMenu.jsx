import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContextMenu.css';
import Menu from '@material-ui/core/Menu';
import { getActionsByMultipleFiles } from '../../Api/ApiHandler.js';
import OpenAction from './ContextMenuActions/OpenAction.jsx';
import RemoveAction from './ContextMenuActions/RemoveAction.jsx';
import MoveAction from './ContextMenuActions/MoveAction.jsx';
import CopyAction from './ContextMenuActions/CopyAction.jsx';
import EditAction from './ContextMenuActions/EditAction.jsx';
import RenameAction from './ContextMenuActions/RenameAction.jsx';
import DownloadAction from './ContextMenuActions/DownloadAction.jsx';

class ContextMenu extends Component {

    render() {
        const { acts, visible, x, y } = this.props;
        const actionsComp = acts.map((act, key) => {
            let component;
            if (act === 'open') {
                component = <OpenAction key={key} />;
            }
            if (act === 'edit') {
                component = <EditAction key={key} />;
            }
            if (act === 'copy') {
                component = <CopyAction key={key} />;
            }            
            if (act === 'move') {
                component = <MoveAction key={key} />;
            }
            if (act === 'rename') {
                component = <RenameAction key={key} />;
            }
            if (act === 'download') {
                component = <DownloadAction key={key} />;
            }
            if (act === 'remove') {
                component = <RemoveAction key={key} />;
            }
            return component;
        });

        return (
            <div> 
                <Menu 
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: y, left: x }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={visible} 
                    onClose={ () => {} } 
                    PaperProps={{ style: {width: 170} }}>
                    { actionsComp }
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        x: state.contextMenuPosition[0] || 0,
        y: state.contextMenuPosition[1] || 0,
        visible: !!state.contextMenuVisible,
        acts: getActionsByMultipleFiles(state.selectedFiles),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
