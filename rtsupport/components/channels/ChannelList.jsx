import React, { Component } from 'react';
import Channel from './Channel.jsx';

export default class ChannelList extends Component {
  static propTypes = {
    channels: React.PropTypes.array.isRequired,
    setChannel: React.PropTypes.func.isRequired,
    activeChannel: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <ul>{
        this.props.channels.map( chan => {
        return (<Channel
            channel={ chan }
            key={ chan.id }
            setChannel={ this.props.setChannel }
            activeChannel={ this.props.activeChannel }
            />);
        })
      }</ul>
    );
  }
}
