import React, { Component } from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import UserSection from './users/UserSection.jsx';
import Socket from '../../socket.js';
import UUID from '../util/uuid.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      activeChannel: {},
      messages: [],
      users: [],
      activeUserID: "",
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
    window.addEventListener("beforeunload", (ev) => {
      socket.close();
    });
  }
  onMessageAdd(message) {
    console.log("message from server", message)
    console.log("message.CreatedAt", message.createdAt)
    var d = new Date(message.createdAt)
    message.createdAt = d.getMonth() + " - " + d.getDay() + " - " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
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
      if (editUser.id === user.id) {
        return editUser;
      }
      return user;
    });
    this.setState({ users });
  }
  onConnect() {
    this.setState({ connected: true });
    this.socket.emit("user subscribe");
    let activeUserID = UUID();
    this.socket.emit("user add", { name: "Anonymous", id: activeUserID });
    this.setState({ activeUserID });
    this.socket.emit("channel subscribe");
  }
  onDisconnect() {
    this.socket.emit("log", "disconnected");
    this.removeUserIfUnedited();
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
      channelID: activeChannel.id,
    });
  }
  setUserName(userName) {
    let { activeUserID } = this.state;
    let user = {
      name: userName,
      id: activeUserID,
    };
    this.socket.emit("user edit", user);
  }
  removeUserIfUnedited() {
    var users = this.state.users.filter(u => {
      return u.id === this.state.activeUserID & u.name === "Anonymous";
    });
    if (users[0].name) {
      this.socket.emit("user remove", { id: users[0].id });
    }
  }
  addMessage(body) {
    let { activeChannel, activeUserID } = this.state;
    var users = this.state.users.filter(u => {
      return u.id === this.state.activeUserID;
    });
    let channelMessage = {
      channelID: activeChannel.id,
      body: body,
      author: users[0].name,
    }
    this.socket.emit("message add", channelMessage);
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
            setUserName={ this.setUserName.bind(this) }
          />
        </div>
        <div className="messages-container">
          <MessageSection
            { ...this.state }
            addMessage={ this.addMessage.bind(this) }
          />
        </div>
      </div>
  );
  }
}
