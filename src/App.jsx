import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';



//1) Set the initial state
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentUser: {name: 'Anonymous'},
      messages: []
    };
    this.socket = {};
    this.sendMessage = this.sendMessage.bind(this);
    this.postNotification = this.postNotification.bind(this);
  }
  
  // In App.jsx - 
  // Add a this.setState() to the sendMessage() function 
  // so that the new message being sent is added to
  //  this.state.messages (Use .concat)

  sendMessage(data) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: data.content
    };

    this.socket.send(JSON.stringify(newMessage));
    this.state.messages.concat(data);
    this.setState(this.state);
  }

// this.handleUpdateName in ChatBar.jsx - 
// going to be the changeName method, 
// passed down as props from App.jsx.

  changeName(name) {
    let user = this.state.currentUser;
    user.name = name;
    this.setState({currentUser: user});
  }
  
  postNotification(data) {
    const newName = data.username;

    if (this.state.currentUser.name !== newName) {
      const newNotification  = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} changed the name to ${newName}`
      }
      this.setState({currentUser: {name: newName}});
      this.socket.send(JSON.stringify(newNotification));
    }

  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    
    this.socket.onopen = (event) => {
      console.log('connected to server');
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
          
      switch(data.type) {
        case 'incomingNotification':
        case 'incomingMessage':
          let messages = this.state.messages.concat(data)
          this.setState({messages: messages})
          break;
      }    
    }
  }


  render() {
    return (
      <div>
        <NavBar onlineUsers = {this.state.onlineUsers} />
        <MessageList messages = {this.state.messages} />
        <ChatBar sendMessage = {this.sendMessage}
                 postNotification = {this.postNotification}
                 currentUser = {this.state.currentUser} 
                 changeName = {this.changeName} />
      </div>
    )
  }
}
export default App;