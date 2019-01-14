import React, { Component } from 'react';
import FileList from './Components/FileList/FileList.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import ContextMenu from './Components/ContextMenu/ContextMenu.jsx';
import Dialogs from './Components/Dialogs/Dialogs.jsx';

import { MuiThemeProvider as MaterialUI, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux';
import { setContextMenuVisible, refreshFileList } from './Actions/Actions.js';
import DynamicSnackbar from './Components/Notification/DynamicSnackbar.jsx'; 

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
    typography: {
        useNextVariants: true,
    }
});

class App extends Component {

    componentDidMount() {
        this.props.init();
    };

    render() {
        return (
            <MaterialUI theme={theme}>
                <div onClick={this.props.handleHideContextMenu} onContextMenu={this.props.handleHideContextMenu}>
                    <Navbar />
                    <FileList />
                    <ContextMenu />
                    <DynamicSnackbar />
                    <Dialogs />
                </div>
            </MaterialUI>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(refreshFileList());
        },

        handleHideContextMenu: (event) => {
            if (! (event.target.tagName === 'INPUT' || /label/i.test(event.target.className))) {
                event.preventDefault();
            }
            dispatch(setContextMenuVisible(false));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
