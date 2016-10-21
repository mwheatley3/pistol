import React, {Channel} from 'react';

export default class ChannelForm extends Component{
  propTypes = {
    addChannel: React.PropTypes.func.isRequired
  }
  onSubmit(e){
    e.preventDefault();
    const node = this.refs.channel;
    const channelName = node.value;
    this.props.addChannel(channelName);
    node.value = '';
  }
  render(){
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        <input
          type='text'
          ref='channel'
        />
      </form>
    )
  }
}
