import React, { Component } from 'react';

export default class Channel extends Component {
  static propTypes = {
    channel: React.PropTypes.object.isRequired,
    setChannel: React.PropTypes.func.isRequired,
    activeChannel: React.PropTypes.object.isRequired,
  }
  onClick(e) {
    e.preventDefault();
    const { channel, setChannel } = this.props;
    setChannel(channel);
  }
  render() {
    const { channel, activeChannel } = this.props;
    var active = "";
    if (channel === activeChannel) {
      active = "active";
    }
    return (
      <li className={ active }>
        <a onClick={ this.onClick.bind(this) }>
          {channel.name}
        </a>
      </li>
    );
  }
}
