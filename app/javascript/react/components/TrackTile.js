import React from 'react'

const PlaylistTile = props => {
  return(
    <div>
      <div id={props.id}>
        {props.name} - {props.artist}
      </div>
    </div>
  )
}

export default PlaylistTile;
