import React, { Component } from 'react';

export default class User extends Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
  }
  render() {
    return (
      <li>
        {this.props.user.name}
      </li>
    );
  }
}
