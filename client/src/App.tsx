import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageList from './MessageList';

class App extends Component {
  render() {
    return (
      <div className="App">        
        <main>
          Test          
          <MessageList/>
        </main>
      </div>
    );
  }
}

export default App;
