import React, { Component } from 'react';

export default class MessageForm extends Component {
  static propTypes = {
    addMessage: React.PropTypes.func.isRequired,
  }
  onSubmit(e) {
    e.preventDefault();
    const node = this.refs.message;
    const message = node.value;
    this.props.addMessage(message);
    node.value = '';
  }
  render() {
    return (
      <form onSubmit={ this.onSubmit.bind(this) }>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Type Message"
            type="text"
            ref="message"
          />
        </div>
      </form>
    );
  }
}
