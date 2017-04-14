import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';



//1) Set the initial state
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentUser: {name: ''},
      messages: []
    };
    this.sendMessage = this.sendMessage.bind(this);
  }
  
  // In App.jsx - 
  // Add a this.setState() to the sendMessage() function 
  // so that the new message being sent is added to
  //  this.state.messages (Use .concat)

  sendMessage({username, message: content}) {
    const newMessage = {
      username,
      content
    };
    console.log('sending this thru socket:', newMessage)
    this.socket.send(JSON.stringify(newMessage));
  }

// this.handleUpdateName in ChatBar.jsx - 
// going to be the changeName method, 
// passed down as props from App.jsx.

  changeName(name) {
    let user = this.state.currentUser;
    user.name = name;
    this.setState({currentUser: user});
  }
  
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    
    this.socket.onopen = (event) => {
      console.log('connected to server');
    }

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
          const message = this.state.messages.concat(msg)
          this.setState({messages: message})
         
      }
    }


  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages = {this.state.messages} />
        <ChatBar sendMessage = {this.sendMessage}
                 currentUser = {this.state.currentUser} />
      </div>
    )
  }
}
export default App;