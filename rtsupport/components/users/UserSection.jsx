import React, { Component } from 'react';
import UserList from './UserList.jsx';
import UserForm from './UserForm.jsx';

export default class UserSection extends Component {
  static propTypes = {
    users: React.PropTypes.array.isRequired,
    activeUser: React.PropTypes.object.isRequired,
    addUser: React.PropTypes.func.isRequired,
    setUser: React.PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className="support panel panel-primary">
        <div className="panel-heading">
          <strong>Users</strong>
        </div>
        <div className="panel-body users">
          <UserList { ...this.props }/>
          <UserForm { ...this.props }/>
        </div>
      </div>

    );
  }
}
