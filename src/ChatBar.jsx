import React, {Component} from 'react';

class ChatBar extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     username: this.props.currentUser.name,
  //     newMessage: ''
  //   }
  //   // this.handleInputName = this.handleInputName.bind(this);
  //   // this.handleInputContent = this.handleInputContent.bind(this);
  //   // this.handleUpdateMsaage = this.handleUpdateMsaage.bind(this);
  //   // this.handleUpdateName = this.handleUpdateName.bind(this);
  // }

  // handleInputName(event) {
  //   this.setState({username: event.target.value});
  // }
  

  // handleInputContent(event) {
  //   this.setState({newMessage: event.target.value});
  // }

  // handleUpdateMsaage(event) {
  //   if (event.which === 13) {
  //     event.preventDefault();
      
  //     const data = {
  //       username: this.state.oldName,
  //       content: event.target.value
  //     }
  //    {this.props.sendMessage(data)}
  //   }
  // }

  // handleUpdateName(event) {
  //   if (event.which === 13) {
  //    event.preventDefault();
  //    const newNotification = {
  //      username: event.target.value
  //    }
  //    {this.props.postNotification(newNotification)}
  //   }
  // }
  sendMessage(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(event.target.value);
      event.target.value = ''; 
    }
  }

  changeUser (event) {
      if (event.key === 'Enter') {
        this.props.handleChange(event.target.value);
      }
  }


  render() {
    return (
      
        <footer className = 'chatbar'>
          <input className = 'chatbar-username' placeholder = 'Your Name (Optional)' type = 'text'
            defaultValue = {this.props.username.name}
            onKeyPress = {this.changeUser} />
          <input className = 'chatbar-message' placeholder = 'Type a message and hit ENTER' type = 'text'
            onKeyPress = {this.sendMessage} />
        </footer>
    );
  }
}

export default ChatBar;
