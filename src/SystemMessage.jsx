import React, {Component} from 'react';

class SystemMessage extends Component {
  render() {
    return (
      <div className = 'systemMessage'>
          {this.props.content}
      </div>
    );
  }
}
export default SystemMessage;