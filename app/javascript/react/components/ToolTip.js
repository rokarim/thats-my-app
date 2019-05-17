import React from 'react'

const ToolTip = props => {
  return(
    <div>
      <div id="tooltip" className={props.position} style={props.style}>
        <div className="tooltip-arrow" />
        <div className="tooltip-label">{props.title}</div>
      </div>
    </div>
  )
}

export default ToolTip;
