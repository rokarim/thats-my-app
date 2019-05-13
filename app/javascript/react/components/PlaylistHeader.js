import React from 'react'

const PlaylistHeader = props => {
  let genres = []
  if(props.genres !== undefined){
    props.genres.forEach(genre => {
      genres.push(genre.name.charAt(0).toUpperCase() + genre.name.slice(1))
    })
  }
  return(
      <div id={props.id} className="playlist-header">
        PLAYLIST DETAILS
        <hr />
        <div className="playlist-details">
          Style
          <hr />
          {props.style}
          <br />
          <br />
          Genres<hr />{genres.join(", ")}
          <br />
          <br />
          Number of tracks<hr />{props.length}
        </div>
      </div>
  )
}

export default PlaylistHeader;
