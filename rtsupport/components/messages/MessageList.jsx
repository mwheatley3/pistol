import React, { Component } from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  static propTypes = {
    activeChannel: React.PropTypes.object.isRequired,
    activeMessages: React.PropTypes.array.isRequired,
  }

  render() {
    return (
      <ul>{
        this.props.activeMessages.map( (message, i) => {
        return (
          <Message message={ message } key={ i }/>
          );
        })
      }</ul>
    );
  }
}
