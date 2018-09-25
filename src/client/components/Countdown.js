import React from 'react';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: props.startTime,
      switch: true
    };
  }

  componentDidMount = () => {
    this.startCountdown()
  }

  componentWillUnmount = () => {
    console.log('fuck')
    clearTimeout(this.counterTimeoutHandle)
    this.setState({seconds: this.props.startTime})
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps, this.props)
    if (nextProps.reset !== this.props.reset) {
      this.setState({ seconds: nextProps.startTime })
      clearTimeout(this.counterTimeoutHandle)

    }
  }

  startCountdown = () => {
    console.log('countdownStarted')
    this.counterTimoutHandle = setTimeout(() => {
      this.decrementSeconds()
    }, 1000)
  }

  decrementSeconds = async () => {
    console.log('seconds', this.state.seconds)
    const prevSeconds = this.state.seconds
    console.log('prevSeconds', prevSeconds)
    await this.setState({seconds: (prevSeconds - 1)})
    console.log(this.state)
    if (this.state.seconds > 1) {
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