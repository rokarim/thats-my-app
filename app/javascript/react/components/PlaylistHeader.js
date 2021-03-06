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
        <hr />
        <div className="playlist-details">
          <span className="sub-title">Style</span>
          <br />
          {` ${props.style}`}
          <hr />
          <br />
          <span className="sub-title">Genres</span>
          <br />
          {` ${genres.join(", ")}`}
          <hr />
          <br />
          <span className="sub-title">Number of tracks</span>
          <br />
          {` ${props.length}`}
        </div>
      </div>
  )
}

export default PlaylistHeader;
