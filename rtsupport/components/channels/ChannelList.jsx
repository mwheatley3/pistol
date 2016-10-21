import React, {Component} from 'react';
import Channel from './Channel.jsx'

export default class ChannelList extends Component{
  propTypes = {
    channels: React.PropTypes.Array.isRequired,
    setChannel: React.PropTypes.func.isRequired
  }
  render(){
    return(
      <ul>
        this.props.channels.map((key, channel) => {
          <Channel
            channel={channel}
            setChannel={this.props.setChannel}
            />
        })
      </ul>
    )
  }
}
