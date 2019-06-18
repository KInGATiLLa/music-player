import React, {Component, Fragment} from 'react'
import AudioHeader from '../components/AudioHeader'
import TrackContainer from '../components/TrackContainer'
import ControlButton from '../components/ControlButton'
import Track from '../components/Track'
import {convertTime, parseTrackName} from '../utils'
import {connect} from 'react-redux'
import {audioFileRead} from '../utils/audio'
import {colors} from '../utils/theme'
import {Consumer} from '../context'
import {Route, withRouter} from 'react-router-dom'

class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      musics: [],
      duration: '',
      seekTime: '',
      rangeValue: 0,
      rangeMax: 0,
      fileLoaded: false,
      isPlaying: false,
      currentTrack: 0,
    }
    this.audio = React.createRef()
  }

  playMusic = track => {
    this.setState({isPlaying: false})
    const {musics} = this.state
    const t = track === 0 ? musics[0] : musics[track]
    audioFileRead(this.audio, t, () => {
      this.setState({
        duration: convertTime(Math.round(this.audio.duration)),
        rangeMax: Math.round(this.audio.duration),
        currentTrack: track || 0,
      })
      this.play()
    })
  }
  fileChange = e => {
    this.audio.pause()
    const files = e.target.files,
      f = []
    for (let i = 0; i < files.length; i++) {
      f.push(files[i])
    }
    if (f.length > 0) {
      this.setState({musics: f}, () => {
        const {musics} = this.state
        audioFileRead(this.audio, musics[0], () => {
          this.setState({
            duration: convertTime(Math.round(this.audio.duration)),
            rangeMax: Math.round(this.audio.duration),
            currentTrack: 0,
          })
          this.play()
        })
      })
    }
  }
  onTimeUpdate = e => {
    this.setState({
      seekTime: convertTime(Math.round(e.target.currentTime)),
      rangeValue: Math.round(e.target.currentTime),
    })
  }
  onAudioEnded = () => {
    const {currentTrack, musics} = this.state
    if (currentTrack === musics.length - 1) {
      audioFileRead(this.audio, musics[0], () => {
        this.setState({
          duration: convertTime(Math.round(this.audio.duration)),
          rangeMax: Math.round(this.audio.duration),
          currentTrack: 0,
        })
        this.pause()
      })
    }
    this.next()
  }
  play = () => {
    if (this.audio.src === '') return false
    this.setState({isPlaying: true}, () => {
      this.audio.play()
    })
  }
  pause = () => {
    if (this.audio.src === '') return false
    this.setState({isPlaying: false}, () => {
      this.audio.pause()
    })
  }
  prev = () => {
    if (this.audio.src === '') return false
    this.setState(
      state => {
        const prev = state.currentTrack - 1
        if (prev > -1) {
          return {
            currentTrack: prev,
          }
        }
        return {currentTrack: 0}
      },
      () => {
        this.playMusic(this.state.currentTrack)
      },
    )
  }
  next = () => {
    if (this.audio.src === '') return false
    this.setState(
      state => {
        const lastMusic = state.musics.length - 1
        const next = state.currentTrack + 1
        if (next <= lastMusic) {
          return {
            currentTrack: next,
          }
        }
        return {currentTrack: 0}
      },
      () => {
        this.playMusic(this.state.currentTrack)
      },
    )
  }
  render() {
    const {
      musics,
      currentTrack,
      seekTime,
      rangeMax,
      rangeValue,
      duration,
      isPlaying,
    } = this.state
    let musicName = '',
      prev = '',
      next = '',
      p = currentTrack === 0 ? currentTrack : currentTrack - 1,
      n = currentTrack === musics.length - 1 ? 0 : currentTrack + 1
    if (musics.length > 0) {
      musicName = parseTrackName(musics[currentTrack])
      prev = parseTrackName(musics[p])
      next = parseTrackName(musics[n])
      document.title = musicName
    }

    return (
      <Fragment>
        <Consumer>
          {value => (
            <Fragment>
              <AudioHeader fileChange={this.fileChange} />
              <div className="Audio_main">
                {/* Track container */}
                <Route
                  exact
                  path="/"
                  render={props => (
                    <TrackContainer
                      {...props}
                      musics={musics}
                      playMusic={this.playMusic}
                    />
                  )}
                />
                <Route
                  path="/t/:track"
                  render={props => <Track {...props} />}
                />
                {/* Audio section */}
                <div
                  className="Audio_section"
                  style={{
                    backgroundColor:
                      value.isDark === true ? colors.wd : colors.w,
                    boxShadow:
                      value.isDark === true
                        ? 'none'
                        : '0px -1px 2px 0px grey',
                  }}
                >
                  <div className="Audio_progress">
                    <progress
                      min="0"
                      value={rangeValue}
                      max={rangeMax || '100'}
                      onChange={() => rangeValue}
                      className="progress"
                      style={{
                        backgroundColor:
                          value.isDark === true
                            ? colors.ee
                            : this.props.theme,
                      }}
                    />
                  </div>
                  <div className="Audio_title_seek">
                    <div
                      className="Audio_time"
                      style={{
                        marginLeft: '1em',
                        color:
                          value.isDark === true
                            ? colors.ee
                            : colors.one,
                      }}
                    >
                      {seekTime || '00:00'}
                    </div>
                    <div className="Audio_name">
                      <h3
                        style={{
                          color:
                            value.isDark === true
                              ? colors.ee
                              : colors.one,
                        }}
                      >
                        {(musics.length > 0 && musicName) ||
                          'Music Title'}
                      </h3>
                    </div>
                    <div
                      className="Audio_time"
                      style={{
                        marginRight: '1em',
                        color:
                          value.isDark === true
                            ? colors.ee
                            : colors.one,
                      }}
                    >
                      {duration || '00:00'}
                    </div>
                  </div>
                  <div className="Audio_controls">
                    <div className="Audio_controls_list">
                      <button className="Audio_list_btn">
                        <i
                          className="fas fa-bars"
                          style={{
                            color: this.props.theme,
                          }}
                        />
                      </button>
                    </div>
                    <div className="Audio_controls_btn">
                      <ControlButton
                        onClick={() => {}}
                        title="Repeat"
                        theme={this.props.theme}
                        icon="fa-redo-alt"
                      />
                      <ControlButton
                        onClick={this.prev}
                        title={prev}
                        theme={this.props.theme}
                        icon="fa-backward"
                      />
                      <div className="flip-container">
                        <div
                          className={`flipper ${
                            isPlaying ? 'hover' : ''
                          }`}
                        >
                          <div className="front">
                            <button
                              className="play-btn"
                              onClick={this.play}
                            >
                              <i
                                className="fas fa-play"
                                style={{
                                  color: this.props.theme,
                                }}
                              />
                            </button>
                          </div>
                          <div className="back">
                            <button
                              className="play-btn"
                              onClick={this.pause}
                            >
                              <i
                                className="fas fa-pause"
                                style={{
                                  color: this.props.theme,
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <ControlButton
                        onClick={this.next}
                        title={next}
                        theme={this.props.theme}
                        icon="fa-forward"
                      />
                      <ControlButton
                        onClick={() => {}}
                        title="Random"
                        theme={this.props.theme}
                        icon="fa-random"
                      />
                    </div>
                    <div className="Audio_controls_volume">
                      <input
                        type="range"
                        name="volume"
                        className="range"
                        min="0"
                        max="10"
                        value="10"
                        onChange={() => {}}
                        style={{backgroundColor: this.props.theme}}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <audio
                ref={audio => (this.audio = audio)}
                onTimeUpdate={this.onTimeUpdate}
                onEnded={this.onAudioEnded}
              />
            </Fragment>
          )}
        </Consumer>
      </Fragment>
    )
  }
}

export default withRouter(
  connect(state => ({
    theme: state.theme,
  }))(AudioPlayer),
)
