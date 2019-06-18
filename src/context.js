import React, {Component} from 'react'

const ThemeContext = React.createContext()

export class Provider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDark: false,
    }
  }
  toggleDark = e => {
    this.setState({isDark: e.target.checked})
  }
  render() {
    return (
      <ThemeContext.Provider
        value={{
          isDark: this.state.isDark,
          toggleDark: this.toggleDark,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}
export const Consumer = ThemeContext.Consumer
