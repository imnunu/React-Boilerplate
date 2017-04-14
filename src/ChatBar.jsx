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
    // this.handleUpdateName = this.handleUpdateName.bind(this);
  }

  handleInputName(event) {
    console.log(event.target.value)
    this.setState({username: event.target.value});
    if (event.which === 13) {
      console.log('u clicked enter')

    }
  }
  

  handleInputContent(event) {
    this.setState({newMessage: event.target.value});
  }

  handleUpdateMsaage(event) {
    if (event.which === 13) {
      event.preventDefault();
      console.log('username', this.state.username);
      const data = {
        username: this.state.username,
        message: event.target.value
      }
     {this.props.sendMessage(data)}
    }
  }

  // handleUpdateName(event) {
  //   event.preventDefault();
  //   if (event.which === 13) {
  //     console.log('clicked enter');
  //   }
  //   // event.preventDefault();
  //   // this.setState({username: event.target.value});
  //   // if (event.which === 13) {
  //   //   // let others know
  //   // }
  // }


  render() {
    return (
      
        <footer className = 'chatbar'>
          <input className = 'chatbar-username' placeholder = 'Your Name (Optional)' type = 'text'
            onKeyPress = {this.handleInputName} />
          <input className = 'chatbar-message' placeholder = 'Type a message and hit ENTER' type = 'text'
            value = {this.state.newMessage} 
            onChange = {this.handleInputContent} 
            onKeyPress = {this.handleUpdateMsaage} />
        </footer>
    );
  }
}

export default ChatBar;
