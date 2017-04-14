import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.currentUser.name,
      newMessage: ''
    }
    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputContent = this.handleInputContent.bind(this);
    this.handleUpdateMsaage = this.handleUpdateMsaage.bind(this);
    this.handleUpdateName = this.handleUpdateName.bind(this);
  }

  handleInputName(event) {
    this.setState({username: event.target.value});
  }
  

  handleInputContent(event) {
    this.setState({newMessage: event.target.value});
  }

  handleUpdateMsaage(event) {
    if (event.which === 13) {
      event.preventDefault();
      
      const data = {
        
        content: event.target.value
      }
     {this.props.sendMessage(data)}
    }
  }

  handleUpdateName(event) {
    if (event.which === 13) {
     event.preventDefault();
     const newNotification = {
       username: event.target.value
     }
     {this.props.postNotification(newNotification)}
    }
  }


  render() {
    return (
      
        <footer className = 'chatbar'>
          <input className = 'chatbar-username' placeholder = 'Your Name (Optional)' type = 'text'
            value = {this.state.username}
            onChange = {this.handleInputName}
            onKeyPress = {this.handleUpdateName} />
          <input className = 'chatbar-message' placeholder = 'Type a message and hit ENTER' type = 'text'
            value = {this.state.newMessage} 
            onChange = {this.handleInputContent} 
            onKeyPress = {this.handleUpdateMsaage} />
        </footer>
    );
  }
}

export default ChatBar;
