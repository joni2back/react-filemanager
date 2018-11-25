import React, { Component } from 'react';
import './ContextMenu.css';

class ContextMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            y: 0,
            visible: false
        };

        window.addEventListener('CONTEXT_MENU_HIDE', this.handleHide.bind(this));
        window.addEventListener('CONTEXT_MENU_SHOW', this.handleShow.bind(this));
    }

    handleShow(event) {
        const { x, y } = event.detail;
        this.setState({ visible: true, x, y });
    }

    handleHide(event) {
        this.setState({ visible: false });
    }

    render() {
        return (
            <div className="ContextMenu" style={{top: this.state.y, left: this.state.x, display: this.state.visible ? 'block':'none'}}>
                <ul>
                    <li>Rename</li>
                    <li>Delete</li>
                </ul>
            </div>
        );
    }
}

export default ContextMenu;
