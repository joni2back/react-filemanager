import React, { Component } from 'react';
import { connect } from 'react-redux';
import './File.css';
import {buildFileList, setDirectory} from '../../Actions/Actions.js';

class File extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            type: null
        };
    }

    handleContextMenu  = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let x = event.clientX || (event.touches && event.touches[0].pageX);
        let y = event.clientY || (event.touches && event.touches[0].pageY);

        if (this.props.posX) {
            x -= this.props.posX;
        }
        if (this.props.posY) {
            y -= this.props.posY;
        }

        event = new window.CustomEvent('CONTEXT_MENU_SHOW', {detail: {x, y}});
        window.dispatchEvent(event);
    }

    render() {
        const { type, name, handleClick, handleDoubleClick } = this.props;
        return (
            <div className="File" 
            filename={name} 
            filetype={type} 
            onClick={handleClick} 
            onDoubleClick={handleDoubleClick} 
            onContextMenu={this.handleContextMenu.bind(this)}>
                <h6>{type}</h6>
                <span title={name}>{name}</span>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleDoubleClick: (event) => {
            if (event.currentTarget.getAttribute('filetype') === 'file') {
                return;
            }
            dispatch(buildFileList());
            dispatch(setDirectory(event.currentTarget.getAttribute('filename')));
        },
        handleClick: (event) => {
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(File);

