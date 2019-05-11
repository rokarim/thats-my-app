import React from 'react';
import TrackTile from '../components/TrackTile'
class PlaylistShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylist: null,
      playlist: [],
      message: ""
    }
    this.deletePlaylist=this.deletePlaylist.bind(this)
    this.addToSpotify=this.addToSpotify.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({selectedPlaylist: newProps.selectedPlaylist})
    this.setState({playlist: newProps.playlistToShow})
  }

  deletePlaylist(){
    if (confirm('Please confirm')){
      fetch(`/api/v1/playlists/${this.state.selectedPlaylist}`, {
        method: 'DELETE',
        credentials: 'same-origin'
      })
      .then((result) => {
        this.props.deletePlaylist(this.state.selectedPlaylist)
        this.setState({selectedPlaylist: null })
      })
    }
  }

  addToSpotify(event){
    let payload={playlist_id: event.target.id}
    fetch('api/v1/spotify', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {

      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let tracks = "No tracks to show"
    let deleteButton = ""
    let addToSpotifyButton = ""
    if (this.state.selectedPlaylist !== null && this.state.playlist.tracks !== undefined){
      let status = ""
      let buttonText = ""
      if (this.state.playlist.saved === false){
        status = ""
        buttonText = "Create on Spotify"
      } else {
        status = "disabled"
        buttonText = "Check it out on Spotify!"
      }
      addToSpotifyButton = <button id={this.state.selectedPlaylist} className="add-to-spotify" onClick={this.addToSpotify}>{buttonText}</button>
      deleteButton = <button id={this.state.selectedPlaylist} className="delete-playlist" onClick={this.deletePlaylist}>Delete playlist</button>
      tracks = this.state.playlist.tracks.map(track =>{
        return(
          <TrackTile
            key={track.spotify_track_id}
            id={track.id}
            name={track.name}
            artist={track.artist}
            />
        )
      })
    }
    return(
      <div>
        {addToSpotifyButton}
        {deleteButton}
        {tracks}
      </div>
    )
  }
}

export default PlaylistShowContainer;
