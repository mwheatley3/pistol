import React, { Component } from 'react';

export default class MessageForm extends Component {
  static propTypes = {
    setUserName: React.PropTypes.func.isRequired,
  }
  onSubmit(e) {
    e.preventDefault();
    const node = this.refs.user;
    const userName = node.value;
    this.props.setUserName(userName);
    node.value = '';
  }
  render() {
    return (
      <form onSubmit={ this.onSubmit.bind(this) }>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Set Your Name..."
            type="text"
            ref="user"
          />
        </div>
      </form>
    );
  }
}
