import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  
  render() {
    let messages = [];
    this.props.messages.map((message)=>{
      messages.push(<Message key = {Date.now()} username = {message.username} content = {message.content}/>)  
    })
  
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">Anonymous1</span>
          <span className="message-content">I won't be impressed with technology until I can download food.</span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
        {messages}
      </main>
    );
  }
}
export default MessageList;
