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
    console.log('ok')
    this.startCountdown()
  }

  componentWillUnmount = () => {
    clearTimeout(this.counterTimeoutHandle)
    this.setState({seconds: this.props.startTime})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset !== this.props.reset) {
      this.setState({ seconds: nextProps.startTime })
      clearTimeout(this.counterTimeoutHandle)

    }
  }

  startCountdown = () => {
    this.counterTimoutHandle = setTimeout(() => {
      this.decrementSeconds()
    }, 1000)
  }

  decrementSeconds = async () => {
    const prevSeconds = this.state.seconds
    await this.setState({seconds: (prevSeconds - 1)})
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