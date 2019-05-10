import React from 'react'

const PlaylistTile = props => {
  return(
    <div className = "playlist-tile">
      <div id={props.id} className={props.className} onClick={props.setSelectedPlaylist}>
        {props.name}
      </div>
    </div>
  )
}

export default PlaylistTile;
