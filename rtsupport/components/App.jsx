import React, { Component } from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import UserSection from './users/UserSection.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      activeChannel: {},
      messages: [],
      users: [],
      activeUser: {},
    };
  }
  addChannel(name) {
    let { channels } = this.state;
    var newChannel = {
      id: channels.length,
      name: name,
    };
    channels.push(newChannel);
    this.setState({ channels:channels });
    this.setChannel(newChannel);
    // TODO send to server
  }
  setChannel(activeChannel) {
    this.setState({ activeChannel });
    // TODO get messages for this channel
  }
  addMessage(message) {
    let { activeChannel, messages, activeUser } = this.state;
    var newMessage = {
      id: messages.length + 1,
      userID: activeUser.userID,
      userName: activeUser.userName,
      channelID: activeChannel.id,
      createdAt: Date.now(),
      messageText: message,
    };
    messages.push(newMessage);
    this.setState({ messages });
    // TODO send to server
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
