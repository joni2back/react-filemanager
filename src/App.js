import React, { Component } from 'react';
import './App.css';
import FileList from './Components/FileList/FileList.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import ContextMenu from './Components/ContextMenu/ContextMenu.jsx';
import Breadcrumb from './Components/Breadcrumb/Breadcrumb.jsx';
import CreateFolder from './Components/Dialogs/CreateFolder/CreateFolder.jsx';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends Component {
    constructor(props) {
        super(props);
    }

    handleHideContextMenu() {
        window.dispatchEvent(new window.CustomEvent('CONTEXT_MENU_HIDE'));
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App" onClick={this.handleHideContextMenu.bind(this)} onContextMenu={this.handleHideContextMenu.bind(this)}>
                    <Navbar />
                    <Breadcrumb />
                    <CreateFolder />

                    <FileList />
                    <ContextMenu />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
