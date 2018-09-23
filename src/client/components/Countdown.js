import React from 'react';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freeze: props.freezeBool,
      seconds: props.startTime,
    };
  }

  componentDidMount = () => {
    this.startCountdown()
  }

  startCountdown = () => {
    setTimeout(() => {
      this.decrementSeconds()
    }, 1000)
  }

  decrementSeconds = () => {
    const prevSeconds = this.state.seconds
    this.setState({seconds: (prevSeconds - 1), freeze: this.props.freezeBool})
    if (this.state.seconds > 0 && !this.state.freeze) {
      this.startCountdown()
    }
  }

  render() {
    console.log(this.state.freeze)
    // console.log(this.state.seconds > 0)
    return (
      <div>
        {this.state.seconds}
      </div>
    )
  }
}