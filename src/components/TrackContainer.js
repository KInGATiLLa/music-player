import React, {Component} from 'react'
import {connect} from 'react-redux'
import {colors} from '../utils/theme'
import {slugify, parseTrackName} from '../utils'
//import slugify from 'slugify'
import {Consumer} from '../context'
import {Link} from 'react-router-dom'

class TrackContainer extends Component {
  render() {
    const {theme, musics} = this.props
    return (
      <Consumer>
        {value => (
          <div
            className="Tracks_container"
            style={{
              backgroundColor:
                value.isDark === true ? colors.d : colors.w,
            }}
          >
            <ul className="Track_list">
              {musics.length > 0 ? (
                musics.map((music, i) => {
                  //const name = encodeURIComponent(music.name)
                  const track = slugify(music.name)
                  return (
                    <li
                      key={i}
                      className={`Track track-${i}`}
                      style={{
                        color:
                          value.isDark === true
                            ? colors.ee
                            : colors.one,
                        borderBottom:
                          value.isDark === true
                            ? `2px solid ${colors.wd}`
                            : `2px solid ${colors.ee}`,
                      }}
                    >
                      <button
                        onClick={() => this.props.playMusic(i || 0)}
                        style={{backgroundColor: theme}}
                      >
                        <i className="fas fa-play" />
                      </button>
                      <Link to={`/t/${track}`}>
                        {parseTrackName(music)}
                      </Link>
                    </li>
                  )
                })
              ) : (
                <li
                  className="Track_none"
                  style={{
                    color:
                      value.isDark === true ? colors.ee : colors.one,
                  }}
                >
                  Дуу оруулаагүй байна.
                  <i
                    className="fas fa-upload"
                    style={{margin: '0 5px'}}
                  />
                  дарна уу!
                </li>
              )}
            </ul>
          </div>
        )}
      </Consumer>
    )
  }
}

export default connect(state => ({
  theme: state.theme,
}))(TrackContainer)
