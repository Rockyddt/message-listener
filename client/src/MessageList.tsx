import React, { Component } from 'react';
import io from 'socket.io-client';

class MessageList extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }

        const socket = io('http://localhost:5000');
                
        socket.on('message', (message)=>{    
            console.log(message);       
            this.setState({
                list:[...this.state['list'], message]
            })
        });
    }

    render() {        
      return (
        <div>    
            <ul>{this.state['list'].map((m, i)=><li key={i}>{m}</li>)}</ul>               
        </div>
      );
    }
  }
  
  export default MessageList;
  