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
      scoreCount: 0
    };
  }

  componentDidMount = () => {
    document.addEventListener('keypress', this.handleKeyPress)
    this.startTimer()
    this.genCode()
  }

  handleKeyPress = (event) => {
    if (event.charCode === this.state.randomCharCode) {
      this.incrementScore()
      this.genCode()
    }
  }

  startTimer = () => {
    setTimeout(() => {
      this.openModal()
    }, 10000)
  }

  genCode = () => {
    let charNum = Math.floor(Math.random() * 93) + 33
    this.setState({randomCharCode: charNum})
  }

  incrementScore = () => {
    let score = this.state.scoreCount + 1
    this.setState({ scoreCount: score })
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
    this.timeoutHandle = setTimeout(() => {
      this.props.history.push('/doom')
    }, 5000)
  } 
  
  closeModal = () => {
    this.setState({ modalIsOpen: false });
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle)
    }
    this.startTimer()
  }
  
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  render() {
    const modal =  
      <Modal 
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
        <button onClick={this.closeModal}>close</button>
        <div>Click a button or be banished to PAGE 2</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
        You have <Countdown startTime={5}/> seconds
      </Modal>

    const key =
      <div>
        {String.fromCharCode(this.state.randomCharCode)}
      </div>

    const score = this.state.scoreCount

    return (
      <div 
        id="container"
        onKeyDown={this.handleKeyPress}
        tabIndex="0" >
        <div>
          {key}
        </div>
        <div>
          {score}
        </div>
        <button onClick={this.openModal}>Open Modal</button>
          {modal}
          <Countdown startTime={10} />
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
  }
};
