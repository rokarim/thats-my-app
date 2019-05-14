import React from 'react'

const GenreTile = props => {
  return(
    <div className= {`item-box ${props.class}`} id={props.id} onClick={props.handleClick}>
      {props.name}
    </div>
  )
}

export default GenreTile;
