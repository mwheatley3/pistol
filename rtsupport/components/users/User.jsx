import React, { Component } from 'react';

export default class User extends Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    activeUser: React.PropTypes.object.isRequired,
    setUser: React.PropTypes.func.isRequired,
  }
  onClick(e) {
    e.preventDefault();
    const { user, setUser } = this.props;
    setUser(user);
  }
  render() {
    const { user, activeUser } = this.props;
    var active = "";
    if (user === activeUser) {
      active = "active";
    }
    return (
      <li className={ active }>
        <a onClick={ this.onClick.bind(this) }>
          {user.userName}
        </a>
      </li>
    );
  }
}
