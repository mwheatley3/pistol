import React, { Component } from 'react';
import ChannelSection from './channels/ChannelSection.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      activeChannel: {},
    };
  }
  addChannel(name) {
    let { channels } = this.state;
    channels.push({ id: channels.length, name });
    this.setState({ channels });
    // TODO send to server
  }
  setChannel(activeChannel) {
    this.setState({ activeChannel });
    // TODO get messages for this channel
  }
  render() {
    return (
      <div className="app">
        <div className="nav">
          <ChannelSection
            { ...this.state }
            addChannel={ this.addChannel.bind(this) }
            setChannel={ this.setChannel.bind(this) }
          />
        </div>
      </div>
  );
  }
}
