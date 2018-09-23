import React from 'react';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({seconds: (prevSeconds - 1)})
    if (this.state.seconds > 0) {
      this.startCountdown()
    }
  }

  render() {
    return (
      <div>
        {this.state.seconds}
      </div>
    )
  }
}