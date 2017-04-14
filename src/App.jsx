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
    
    // this.sendMessage = this.sendMessage.bind(this);
    // this.postNotification = this.postNotification.bind(this);
  }
  
  // In App.jsx - 
  // Add a this.setState() to the sendMessage() function 
  // so that the new message being sent is added to
  //  this.state.messages (Use .concat)

  newMessage(message) {
    const messages = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: message
    };

    this.ws.send(JSON.stringify(messages));
    // this.state.messages.concat(data);
    // this.setState(this.state);
  }

// this.handleUpdateName in ChatBar.jsx - 
// going to be the changeName method, 
// passed down as props from App.jsx.

  // changeName(name) {
  //   let user = this.state.currentUser;
  //   user.name = name;
  //   this.setState({currentUser: user});
  // }

  handleNameChange(user) {
    let changeUser = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} changed the name to ${user}`
    }
    this.setState({currentUser:{name: user}})
    this.ws.send(JSON.stringify(changeUser))
  }
  
  // postNotification(data) {
  //   const newName = data.username;

  //   if (this.state.currentUser.name !== newName) {
  //     const newNotification  = {
  //       type: 'postNotification',
  //       content: `${this.state.currentUser.name} changed the name to ${newName}`
  //     }
  //     this.setState({currentUser: {name: newName}});
  //     this.ws.send(JSON.stringify(newNotification));
  //   }

  // }

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3001');
    
    this.ws.onopen = (event) => {
      console.log('connected to server');
    }

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
          
      switch(message.type) {
        case 'incomingNotification':
          const notification = this.state.messages.concat(message);
          this.setState({messages: notification});
          break;

        case 'incomingMessage':
          const messages = this.state.messages.concat(message);
          this.setState({messages: messages});
          break;

        // case 'updateUserCount':
        //   this.setState({onlineUsers: data.userCount});
        //   break;

      //  default:
      //    throw new Error('Unlnown event type' + data.type); 
      }    
    }
  }


  render() {
    return (
      <div>
        <NavBar onlineUsers = {this.state.onlineUsers} />
        <MessageList messages = {this.state.messages} />
        <ChatBar newMessage = {this.newMessage}
                 username = {this.state.currentUser} 
                 handleChange = {this.handleNameChange} />
      </div>
    )
  }
}
export default App;