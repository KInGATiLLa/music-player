import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Track extends Component {
  render() {
    const {match} = this.props
    return (
      <div>
        <h1>TrackID : {match.params.track}</h1>
      </div>
    )
  }
}

Track.propTypes = {
  match: PropTypes.object,
}

export default Track
