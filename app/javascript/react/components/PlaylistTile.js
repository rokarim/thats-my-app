import React from 'react'

const PlaylistTile = props => {
  return(
    <div>
      <div id={props.id} onClick={props.setSelectedPlaylist}>
        {props.name}
      </div>
    </div>
  )
}

export default PlaylistTile;
