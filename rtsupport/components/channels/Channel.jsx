import React, {Component} from 'react';

class Channel extends Component {
  propTypes = {
    channel: React.PropTypes.object.isRequired,
    setChannel: React.PropTypes.func.isRequired
  }
  render(){
    const {channel} = this.props;
    return(
      <li>
        <a>
            {this.props.channel.name}
        </a>
      </li>
    )
  }
}
