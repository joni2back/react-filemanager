import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContextMenu.css';
import Menu from '@material-ui/core/Menu';
import { getActionsByFile } from '../../Api/ApiHandler.js';
import OpenAction from './ContextMenuActions/OpenAction.jsx';
import RemoveAction from './ContextMenuActions/RemoveAction.jsx';
import MoveAction from './ContextMenuActions/MoveAction.jsx';

class ContextMenu extends Component {

    render() {
        const { acts, visible, x, y } = this.props;
        const actionsComp = acts.map((act, key) => {
            let component;
            if (act === 'open') {
                component = <OpenAction key={key} />;
            }
            if (act === 'move') {
                component = <MoveAction key={key} />;
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

/**
 * Calculate available actions for selected files, excluding non coincidences
 * @param {Array<Object>} selectedFiles
 * @returns {Array<String>}
 */
export const getActionsBySelectedFiles = (selectedFiles) => {
    let acts = [];
    selectedFiles.forEach(f => {
        const fileActs = getActionsByFile(f.name, f.type);
        /**
         * intersects previous actions with the following to leave only coincidences
         */ 
        acts = acts.length ? acts.filter(value => -1 !== fileActs.indexOf(value)) : fileActs;
    });

    selectedFiles.length > 1 && acts.splice(acts.indexOf('open'), acts.indexOf('open') >= 0);
    return acts;
}

const mapStateToProps = (state) => {
    return {
        x: state.contextMenuPosition[0] || 0,
        y: state.contextMenuPosition[1] || 0,
        visible: !!state.contextMenuVisible,
        acts: getActionsBySelectedFiles(state.selectedFiles),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
