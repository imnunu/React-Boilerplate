import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

//1) Set the initial state
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentUser: {name: 'Bob'},
      messages: [
        {
          username: 'Bob',
          content: 'Has anyone seens my marbles?'
        },
        // {
        //   username: 'Anonymous',
        //   content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        // }
      ]
    };
  }
  

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages = {this.state.messages}/>
        <ChatBar currentUserprop = {this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;
