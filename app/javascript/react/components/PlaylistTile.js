import React from 'react'

const PlaylistTile = props => {
  return(
    <div>
      <div id={props.id} className={`playlist-tile ${props.className}`} onClick={props.setSelectedPlaylist}>
          {props.name}
      </div>
    </div>
  )
}

export default PlaylistTile;

// <div className="delete-playlist" onClick={this.deletePlaylist}>
//   <i className="fas fa-times"></i>
// </div>
