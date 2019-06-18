import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {theme} from '../utils/theme'
import {sideBar} from '../utils'
import {themeChange} from '../actions'
import {connect} from 'react-redux'
import {Consumer} from '../context'
import {colors} from '../utils/theme'

class AudioHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      height: 0,
      width: 0,
    }
    this.getDimensions = this.getDimensions.bind(this)
    this.onSideBarClick = this.onSideBarClick.bind(this)
  }

  getDimensions() {
    const w = window
    const d = document
    const documentElement = d.documentElement
    const body = d.getElementsByTagName('body')[0]
    const width =
      w.innerWidth || documentElement.clientWidth || body.clientWidth
    const height =
      w.innerHeight ||
      documentElement.clientHeight ||
      body.clientHeight
    this.setState({width: width, height: height})
  }
  onThemeChange = e => {
    let key = e.target.value === '' ? 'default' : e.target.value
    this.props.themeChange(theme[key])
  }
  onSideBarClick = () => {
    sideBar(this.state.isOpen, this.handleOutsideClick)
    this.setState(state => {
      return {isOpen: !state.isOpen}
    })
  }
  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return
    }
    this.onSideBarClick()
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.getDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions)
  }

  render() {
    const {theme, fileChange} = this.props
    const {isOpen, width} = this.state
    return (
      <Consumer>
        {value => (
          <Fragment>
            <div
              className={`Sidebar ${isOpen ? 'Sidebar_show' : ''}`}
              style={{
                backgroundColor:
                  value.isDark === true ? colors.wd : colors.w,
                boxShadow:
                  value.isDark === true
                    ? 'none'
                    : '0px 1px 2px 1px grey',
              }}
              ref={node => (this.node = node)}
            >
              <div className="Sidebar_main">
                <div />
                <div className="Sidebar_theme">
                  <div className="Color_theme">
                    <select
                      onChange={this.onThemeChange}
                      className="Color_select"
                      style={{backgroundColor: theme}}
                    >
                      <option value="">Default</option>
                      <option value="1">Belize hole</option>
                      <option value="2">Nephritis</option>
                      <option value="3">Wisteria</option>
                      <option value="4">Green Sea</option>
                      <option value="5">Orange</option>
                    </select>
                  </div>
                  <div className="Dark_theme">
                    <label
                      htmlFor="darkTheme"
                      style={{
                        color:
                          value.isDark === true
                            ? colors.ee
                            : colors.one,
                      }}
                    >
                      Dark
                      <input
                        type="checkbox"
                        checked={value.isDark}
                        id="darkTheme"
                        onChange={value.toggleDark}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="Header"
              style={{
                backgroundColor:
                  value.isDark === true ? colors.wd : colors.w,
                boxShadow:
                  value.isDark === true
                    ? 'none'
                    : '0px 1px 2px 0px grey',
              }}
            >
              <div className="Header_left_sidebar">
                {width < 1000 ? (
                  <button
                    className="Header_sidebar_btn"
                    onClick={this.onSideBarClick}
                  >
                    <i
                      className="fas fa-ellipsis-h"
                      style={{color: theme}}
                    />
                  </button>
                ) : null}
              </div>
              <div className="Header_main">
                <h3 className="Header_title" style={{color: theme}}>
                  Music player
                </h3>
              </div>
              <div className="Header_right_sidebar">
                <div className="Header_upload">
                  <form name="form_upload">
                    <input
                      type="file"
                      id="file-element"
                      accept="audio/mp3"
                      multiple
                      style={{display: 'none'}}
                      onChange={fileChange}
                      ref={fileInput => (this.fileInput = fileInput)}
                    />
                    <button
                      type="button"
                      id="btn-upload"
                      className="btn btn-header"
                      title="Дуу оруулах"
                      onClick={() => this.fileInput.click()}
                    >
                      <i
                        className="fas fa-upload"
                        style={{color: theme}}
                      />
                    </button>
                  </form>
                  <i
                    className="fas fa-search"
                    style={{color: theme}}
                  />
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Consumer>
    )
  }
}

AudioHeader.propTypes = {
  themeChange: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    theme: state.theme,
  }),
  {themeChange},
)(AudioHeader)
