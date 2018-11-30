import React, { Component } from 'react';
import './App.css';
import FileList from './Components/FileList/FileList.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import ContextMenu from './Components/ContextMenu/ContextMenu.jsx';
import Breadcrumb from './Components/Breadcrumb/Breadcrumb.jsx';
import DialogFileContent from './Components/Dialogs/FileContent/FileContent.jsx';
import DialogCreateFolder from './Components/Dialogs/CreateFolder/CreateFolder.jsx';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux';
import { setContextMenuVisible, refreshFileList } from './Actions/Actions.js';

class App extends Component {
    render() {
        const theme = createMuiTheme({
            palette: {
                primary: blue,
            },
            typography: {
                useNextVariants: true,
            }
        });
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App" onClick={this.props.handleHideContextMenu} onContextMenu={this.props.handleHideContextMenu}>
                    <Navbar />
                    <Breadcrumb />
                    <FileList />
                    <DialogFileContent />
                    <DialogCreateFolder />
                    <ContextMenu />
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(refreshFileList());
    return {
        handleHideContextMenu: (event) => {
            event.preventDefault();
            dispatch(setContextMenuVisible(false));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
