import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setFilter} from '../actions'
import {SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED} from '../actions/types'

const style = {
  padding: '.5rem',
  textDecoration: 'none',
  color: '#fff',
  background: '#2c3e50',
  borderRadius: '10px',
  opacity: '1',
}

class Header extends React.Component {
  render() {
    const {active, count, theme} = this.props
    return (
      <div className="hea_der" style={{backgroundColor: theme}}>
        <div className="lo_go">{count ? 'App' : 'Todo'}</div>
        <div
          className="li_nks"
          style={{
            marginRight: active === SHOW_COMPLETED ? '1rem' : '',
            display: count ? 'none' : 'block',
          }}
        >
          <ul>
            <li>
              <a
                onClick={() => this.props.setFilter(SHOW_ALL)}
                style={active === SHOW_ALL ? style : {}}
              >
                All
              </a>
            </li>
            <li>
              <a
                onClick={() => this.props.setFilter(SHOW_ACTIVE)}
                style={active === SHOW_ACTIVE ? style : {}}
              >
                Active
              </a>
            </li>
            <li>
              <a
                onClick={() => this.props.setFilter(SHOW_COMPLETED)}
                style={active === SHOW_COMPLETED ? style : {}}
              >
                Completed
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  setFilter: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    active: state.filter,
    count: state.todos.length === 0,
    theme: state.theme,
  }),
  {setFilter},
)(Header)
