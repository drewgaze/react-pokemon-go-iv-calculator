import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PokemonCard from './components/PokemonCard';
import './App.css';

const muiTheme = getMuiTheme(darkBaseTheme);

const style = {
  backgroundColor: muiTheme.palette.canvasColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'fixed',
  minHeight: '100%',
  minWidth: '100%'
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={style}>
         <PokemonCard
            pokemon=''
         />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;