import React, { Component } from 'react';

export default class MessageForm extends Component {
  static propTypes = {
    addUser: React.PropTypes.func.isRequired,
    activeUser: React.PropTypes.object.isRequired,
  }
  onSubmit(e) {
    e.preventDefault();
    const node = this.refs.user;
    const userName = node.value;
    this.props.addUser(userName);
    node.value = '';
  }
  render() {
    return (
      <form onSubmit={ this.onSubmit.bind(this) }>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Tell Me Your Name"
            type="text"
            ref="user"
          />
        </div>
      </form>
    );
  }
}
