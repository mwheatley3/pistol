import React, { Component } from 'react';

export default class ChannelForm extends Component {
  static propTypes = {
    addChannel: React.PropTypes.func.isRequired,
  }
  onSubmit(e) {
    e.preventDefault();
    const node = this.refs.channel;
    const channelName = node.value;
    this.props.addChannel(channelName);
    node.value = '';
  }
  render() {
    return (
      <form onSubmit={ this.onSubmit.bind(this) }>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Add Channel"
            type="text"
            ref="channel"
          />
        </div>
      </form>
    );
  }
}
