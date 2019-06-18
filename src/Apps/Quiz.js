import React, {Fragment, Component} from 'react'
import {quizs} from '../data/quizR'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quiz: quizs,
      idx: 0,
      result: 0,
      end: false,
    }
  }
  answerClick = ans => {
    const {idx, result, quiz} = this.state
    if (ans === quiz[idx].correct) {
      this.setState({result: result + 1})
    }
    if (idx === quiz.length - 1) {
      this.setState({end: true})
    }

    this.setState({idx: idx + 1})
  }
  replay = () => {
    this.setState({idx: 0, end: false, result: 0})
  }
  render() {
    const {idx, quiz, end, result} = this.state
    if (end === true) {
      return (
        <Fragment>
          <h1>Quiz Result</h1>
          <div>
            Result: {result} of {quiz.length} questions
          </div>
          <button onClick={this.replay}>Dahin ehluuleh</button>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <h1>Quiz</h1>
        <p>{quiz[idx].question}</p>
        <div>
          {quiz[idx].answers.map((ans, i) => {
            return (
              <button key={i} onClick={() => this.answerClick(ans)}>
                {ans}
              </button>
            )
          })}
        </div>
        <div>
          Questions left {idx + 1} of {quiz.length}
        </div>
      </Fragment>
    )
  }
}

export default Quiz
