import React, { Component } from 'react';

export default class Message extends Component {
  static propTypes = {
    message: React.PropTypes.object.isRequired,
  }
  render() {
    const { message } = this.props;
    return (
      <li>
        <div className="author">
          <strong>{ message.userName }</strong>
          <i className="timestamp">{message.createdAt}</i>
        </div>
        <div className="body">
          { message.messageText }
        </div>
      </li>
    );
  }
}
