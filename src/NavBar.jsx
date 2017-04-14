import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span id='userCount'>user online: {this.props.onlineUsers}</span>
      </nav>
    );
  }
}
export default NavBar;
