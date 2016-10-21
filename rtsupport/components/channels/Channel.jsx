import React, {Component} from 'react';

export default class Channel extends Component {
  propTypes = {
    channel: React.PropTypes.object.isRequired,
    setChannel: React.PropTypes.func.isRequired
  }
  onClick(e){
    e.preventDefault()
    const {channel, setChannel} = this.props;
    setChannel(channel);
  }
  render(){
    const {channel} = this.props;
    return(
      <li>
        <a onClick={this.onClick.bind(this)}>
          {channel.name}
        </a>
      </li>
    )
  }
}
