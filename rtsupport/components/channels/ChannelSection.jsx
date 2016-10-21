import React, {Component} from 'react';
import ChannelForm from './ChannelForm.jsx';
import ChannelList from './ChannelList.jsx';

export default class ChannelSection extends Component{
  propTypes = {
    channels: React.PropTypes.Array.isRequired,
    addChannel: React.PropTypes.func.isRequired,
    setChannel: React.PropTypes.func.isRequired
  }
  render(){
    <div>
      <ChannelList {...this.props}/>
      <ChannelForm {...this.props}/>
    </div>
  }
}
