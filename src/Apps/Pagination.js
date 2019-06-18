import React, {Component, Fragment} from 'react'

class Pagination extends Component {
  state = {
    images: [
      'https://via.placeholder.com/250x150',
      'https://via.placeholder.com/150x150',
      'https://via.placeholder.com/250x250',
      'https://via.placeholder.com/350x250',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/360x360',
    ],
    idx: 0,
  }
  handlePrev = () => {
    this.setState(state => {
      if (state.idx === 0) {
        return
      }
      return {idx: state.idx - 1}
    })
  }

  handleNext = () => {
    this.setState(state => {
      if (state.idx === state.images.length - 1) {
        return
      }
      return {idx: state.idx + 1}
    })
  }

  checkDisabled(num = 0, dis = false) {
    return dis === true
      ? this.state.idx === num
        ? 'block'
        : 'none'
      : this.state.idx === num
        ? true
        : false
  }
  renderPagination = () => {
    const elm = []
    const {images} = this.state
    for (let i = 0; i < images.length; i++) {
      elm.push(
        <button
          key={i}
          disabled={this.checkDisabled(i)}
          onClick={() => {
            this.setState({idx: i})
          }}
        >
          {i + 1}
        </button>,
      )
    }
    return elm
  }

  render() {
    const {images, idx} = this.state
    const len = images.length - 1
    return (
      <Fragment>
        <img
          src={images[idx]}
          alt="placeholder"
          width="200"
          height="150"
        />
        <br />
        <div className="google">
          <button
            disabled={this.checkDisabled()}
            onClick={this.handlePrev}
          >
            Өмнөх
          </button>
          <button
            disabled={this.checkDisabled(len)}
            onClick={this.handleNext}
          >
            Дараах
          </button>
        </div>
        {this.renderPagination()}
        <p>{`${idx + 1} / ${images.length}`}</p>
        <p style={{display: this.checkDisabled(len, true)}}>
          Zurag duuslaa
        </p>
      </Fragment>
    )
  }
}

export default Pagination
