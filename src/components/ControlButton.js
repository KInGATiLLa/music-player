import React from 'react'

export default ({onClick, title, theme, icon}) => {
  return (
    <button className="control-btn" onClick={onClick} title={title}>
      <i className={`fas ${icon}`} style={{color: theme}} />
    </button>
  )
}
