import React from 'react';
import Modal from 'react-modal';
import Countdown from './Countdown'
// import { Transition, CSSTransition } from 'react-transition-group'

Modal.setAppElement('#root')

export default class Root extends React.Component {
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
    console.log('ppp')
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
    let highScore = this.state.highestScore
    if (this.state.scoreCount > highScore) {
      await this.setState({ highestScore: this.state.scoreCount })
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
    this.modalTimeoutHandle = setTimeout(() => {
      this.props.history.push('/doom')
    }, 5100)
  }

  closeModal = async () => {
    if (this.modalTimeoutHandle) {
      await clearTimeout(this.modalTimeoutHandle)
    }
    await this.setState({ modalIsOpen: false, charArr: [], scoreCount: 0, resetCounter: true })
    this.props.history.push('/refresh/')
  }
  
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  render() {
    // console.log('window', window.location)


    const modal =  
      <Modal 
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <h2 
          ref={subtitle => this.subtitle = subtitle}>
          Hello
        </h2>
        <button 
          onClick={this.closeModal}>
          Try Again!
        </button>
        <div>
          Click a button or be banished to PAGE 2
        </div>
          {this.state.modalIsOpen &&
            <div 
            className="inline">
            You have <Countdown key="modal" startTime={5}/> seconds
          </div>
          }
      </Modal>

    const generatedKey =
      <div id="targetChar">
        {String.fromCharCode(this.state.randomCharCode)}
      </div>

    const score = this.state.scoreCount
    const arr = this.state.charArr
    const highScore = this.state.highestScore

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
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>
    );
  }
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    backgroundColor       : 'aquamarine',
    transform             : 'translate(-50%, -50%)',
    display               : 'inline-block'
  }
};
