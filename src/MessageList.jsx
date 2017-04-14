import React, {Component} from 'react';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';


class MessageList extends Component {
  render() {
  const messages = [];
  for (let i = 0; i < this.props.messages.length; i++) {
    if (this.props.messages[i].type === 'incomingMessage') {
      messages.push(
        <Message key = {this.props.messages[i].id}
                 username = {this.props.messages[i].username}
                 content = {this.props.messages[i].content} />
      );
    } else {
      messages.push(
        <SystemMessage key = {this.props.messages[i].id}
                       content = {this.props.messages[i].content} />
      );
    }
  }


    return (
      <div className = 'message-list'>
        {
        messages
        }
      </div>
    );
  }
}
export default MessageList;
