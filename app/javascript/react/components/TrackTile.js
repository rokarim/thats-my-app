import React from 'react'

const PlaylistTile = props => {
  return(
    <div id={props.id} className="track-tile">
      <div >
        {props.name} - {props.artist}
      </div>
      <hr />
    </div>
  )
}

export default PlaylistTile;