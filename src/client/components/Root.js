import React from 'react';
import Modal from 'react-modal';
import Countdown from './Countdown'
import { connect } from 'react-redux'
import { updateHighScoreThunk } from '../store/highScore'

Modal.setAppElement('#root')

class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      randomCharCode: 0,
      charArr: [],
      scoreCount: 0,
      resetCounter: false,
      highestScore: 0
    };
  }

  componentDidMount = () => {
    document.addEventListener('keypress', this.handleKeyPress)
    this.startTimer()
    this.genKeyCode()
  }

  handleKeyPress = (event) => {
    if (event.charCode === this.state.randomCharCode && !this.state.modalIsOpen) {
      const updatedArr = this.state.charArr
      updatedArr.push(String.fromCharCode(event.charCode))
      this.setState({ charArr: updatedArr })
      this.incrementScore()
      this.genKeyCode()
    }
  }

  startTimer = () => {
    this.setState({ resetCounter: false })
    setTimeout(() => {
      this.openModal()
    }, 10000)
  }

  genKeyCode = () => {
    let charNum = Math.floor(Math.random() * 93) + 33
    // no I's l's or |'s
    const badChars = [108, 73, 124]
    if (badChars.includes(charNum)) {
      charNum ++
    }
    this.setState({ randomCharCode: charNum })
  }

  incrementScore = async () => {
    let score = this.state.scoreCount + 1
    await this.setState({ scoreCount: score })
    let currentScore = this.state.scoreCount
    let overallHighScore = this.props.highScore.highScore
    if (currentScore > overallHighScore) {
      await this.props.updateHighScore(currentScore)
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
    this.modalTimeoutHandle = setTimeout(() => {
      this.props.history.push('/pagetwo')
    }, 5100)
  }

  closeModal = async () => {
    if (this.modalTimeoutHandle) {
      await clearTimeout(this.modalTimeoutHandle)
    }
    await this.setState({ modalIsOpen: false, charArr: [], scoreCount: 0, resetCounter: true })
    this.props.history.push('/refresh/')
  }

  render() {

    const modal =  
      <Modal 
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        className="modal"
        contentLabel="Example Modal">
        <h4>
          Modal
        </h4>
        <div className="button">
          <button 
            onClick={this.closeModal}>
            Try Again!
          </button>
        </div>
          {this.state.modalIsOpen &&
            <div 
            className="inline">
            Will be redirected to PAGE 2 in <Countdown key="modal" startTime={5}/> 
          </div>
          }
      </Modal>

    const generatedKey =
      <div id="targetChar">
        {String.fromCharCode(this.state.randomCharCode)}
      </div>

    const score = this.state.scoreCount
    const arr = this.state.charArr

    return (
      <div 
        id="container"
        onKeyDown={this.handleKeyPress} >
        <div className="inline">
          <div>{arr}</div>
          <div>{!this.state.modalIsOpen && generatedKey}</div>
        </div>
        {modal}
        <Countdown key="mainPage" startTime={10} reset={this.state.resetCounter}/>
        <div className="score"> Score: {score} </div>
        <div className="highScore"> Your High Score: {this.props.highScore.highScore} </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    highScore: state.highScore
  }
}

const mapDispatch = dispatch => {
  return {
    updateHighScore: highScore => dispatch(updateHighScoreThunk(highScore))
  }
}

export default connect(mapState, mapDispatch)(Root)
