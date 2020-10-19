import React from 'react';
import './App.css';
// import DropDown from './components/drop-down';
import Visualizer from './components/visualizer';

export default class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Visualizer />
      </div>
    );
  }
}

