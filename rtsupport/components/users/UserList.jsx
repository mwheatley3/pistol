import React, { Component } from 'react';
import User from './User.jsx';

export default class UserList extends Component {
  static propTypes = {
    users: React.PropTypes.array.isRequired,
  }

  render() {
    return (
      <ul>{
        this.props.users.map( (user, i) => {
        return (<User
            user={ user }
            key={ i }
            { ...this.props }
            />);
        })
      }</ul>
    );
  }
}
