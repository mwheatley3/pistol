import React, { Component } from 'react';
import UserList from './UserList.jsx';
import UserForm from './UserForm.jsx';

export default class UserSection extends Component {
  static propTypes = {
    users: React.PropTypes.array.isRequired,
    setUserName: React.PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className="support panel panel-primary">
        <div className="panel-heading">
          <strong>Users</strong>
        </div>
        <div className="panel-body users">
          <UserList users={ this.props.users }/>
          <UserForm { ...this.props }/>
        </div>
      </div>
    );
  }
}
