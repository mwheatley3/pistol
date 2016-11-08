import React, { Component } from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import UserSection from './users/UserSection.jsx';
import Socket from '../../socket.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      activeChannel: {},
      messages: [],
      users: [],
      activeUser: {},
      connected: false,
    };
  }
  componentDidMount() {
    let ws = new WebSocket("ws://localhost:4000");
    let socket = this.socket = new Socket(ws);
    socket.on("connect", this.onConnect.bind(this));
    socket.on("disconnect", this.onDisconnect.bind(this));
    socket.on("channel add", this.onAddChannel.bind(this));
    socket.on("user add", this.onAddUser.bind(this));
    socket.on("user edit", this.onEditUser.bind(this));
    socket.on("user remove", this.onRemoveUser.bind(this));
    socket.on("message add", this.onMessageAdd.bind(this));
  }
  onMessageAdd(message) {
    let { messages } = this.state;
    messages.push(message);
    this.setState({ messages });
  }
  onRemoveUser(removeUser) {
    let { users } = this.state;
    users = users.filter( user => {
      return removeUser.userID !== user.userID;
    });
    this.setState({ users });
  }
  onAddUser(user) {
    let { users } = this.state;
    users.push(user);
    this.setState({ users });
  }
  onEditUser(editUser) {
    let { users } = this.state;
    users = users.map(user => {
      if (editUser.userID === user.userID) {
        return editUser;
      }
      return user;
    });
    this.setState({ users });
  }
  onConnect() {
    this.setState({ connected: true });
    this.socket.emit("user subscribe");
    this.socket.emit("channel subscribe");
  }
  onDisconnect() {
    this.setState({ connected: false });
  }
  onAddChannel(channel) {
    let { channels } = this.state;
    channels.push(channel);
    this.setState({ channel });
  }
  addChannel(name) {
    this.socket.emit("channel add", { name });
  }
  setChannel(activeChannel) {
    this.setState({ activeChannel });
    this.socket.emit("message unsubscribe");
    this.setState({ messages: [] });
    this.socket.emit("message subscribe", {
      channelID: activeChannel.ID,
    });
  }
  setUserName(user) {
    this.socket.emit("user edit", { user });
  }
  addMessage(body) {
    let { activeChannel } = this.state;
    this.socket.emit("message add",
      { channelID: activeChannel.id, body });
  }
  addUser(userName) {
    let { users } = this.state;
    var newUser = {
      userID: users.length,
      userName: userName,
    };
    users.push(newUser);
    this.setState({ users });
  }
  setUser(activeUser) {
    this.setState({ activeUser });
  }
  render() {
    const { activeChannel, messages } = this.state;
    var activeMessages = messages.filter( message => {
        return message.channelID === activeChannel.id;
    });
    return (
      <div className="app">
        <div className="nav">
          <ChannelSection
            { ...this.state }
            addChannel={ this.addChannel.bind(this) }
            setChannel={ this.setChannel.bind(this) }
          />
          <UserSection
            { ...this.state }
            addUser={ this.addUser.bind(this) }
            setUser={ this.setUser.bind(this) }
          />
        </div>
        <div className="messages-container">
          <MessageSection
            { ...this.state }
            activeMessages={ activeMessages }
            addMessage={ this.addMessage.bind(this) }
          />
        </div>
      </div>
  );
  }
}
