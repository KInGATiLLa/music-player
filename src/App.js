import React, {Component} from 'react'
import '../src/App.css'
import AudioPlayer from './Apps/AudioPlayer'
import {Provider, Consumer} from './context'
import {withRouter} from 'react-router-dom'
import {colors} from './utils/theme'

class App extends Component {
  render() {
    return (
      <Provider>
        <Consumer>
          {value => (
            <div
              className="App"
              style={{
                backgroundColor:
                  value.isDark === true ? colors.d : colors.w,
              }}
            >
              <AudioPlayer />
            </div>
          )}
        </Consumer>
      </Provider>
    )
  }
}
export default withRouter(App)
