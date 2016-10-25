import React, { Component } from 'react';
import ChannelForm from './ChannelForm.jsx';
import ChannelList from './ChannelList.jsx';

export default class ChannelSection extends Component {
  static propTypes = {
    channels: React.PropTypes.array.isRequired,
    addChannel: React.PropTypes.func.isRequired,
    setChannel: React.PropTypes.func.isRequired,
    activeChannel: React.PropTypes.object.isRequired,
  }
  render() {
    return (
      <div className="support panel panel-primary">
        <div className="panel-heading">
          <strong>Channels</strong>
        </div>
        <div className="panel-body channels">
          <ChannelList { ...this.props }/>
          <ChannelForm { ...this.props }/>
        </div>
      </div>

    );
  }
}
