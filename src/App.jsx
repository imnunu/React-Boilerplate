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
      messages: [
        {
          username: 'Bob',
          content: 'Has anyone seens my marbles?'
        },
        {
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
  }

  sendMessage(data) {
    const newMessage = {
      username: this.state.currentUserName.name,
      content: data.message
    };
    this.socket.send(JSON.stringify(newMessage));
  }
  
  componentDidMount() {
  console.log('componentDidMount <App />');
  setTimeout(() => {
    console.log('Simulating incoming message');
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages = {this.state.messages}/>
        <ChatBar 
          currentUserName = {this.state.currentUser.name} 
          sendMessage = {this.sendMessage} 
          />
      </div>
    );
  }
}
export default App;
