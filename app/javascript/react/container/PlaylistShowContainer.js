import React from 'react';
import TrackTile from '../components/TrackTile'
import PlaylistHeader from '../components/PlaylistHeader'
class PlaylistShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylist: null,
      playlist: [],
      accurate: false,
      saved: false
    }
    this.deletePlaylist=this.deletePlaylist.bind(this)
    this.addToSpotify=this.addToSpotify.bind(this)
    this.markAsAccurate=this.markAsAccurate.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({selectedPlaylist: newProps.selectedPlaylist,
                  playlist: newProps.playlistToShow,
                  accurate: newProps.accurate,
                  saved: newProps.saved,})
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
    this.props.updateSaved()
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
          if (response.status === 500){
            window.location.href = '/users/sign_in'
          }
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {  })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  markAsAccurate(event){
    this.props.updateAccurate()
    fetch(`api/v1/playlists/${event.target.id}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          if (response.status === 500){
            window.location.href = '/users/sign_in'
          }
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => { })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let header = ""
    let tracks = "No tracks to show"
    let deleteButton = ""
    let addToSpotifyButton = ""
    let accurateButtonText = ""
    let markAsAccurate = ""
    if (this.state.selectedPlaylist !== null && this.state.playlist.tracks !== undefined){
      let status = ""
      let accurateStatus = ""
      let buttonText = ""

      if (this.state.saved === false){
        status = ""
        buttonText = "Create on Spotify"
      } else {
        status = "disabled"
        buttonText = "Check it out on Spotify!"
      }

      if (this.state.accurate === false){
        accurateStatus = ""
        accurateButtonText = "Mark as accurate"
      } else {
        accurateStatus = "disabled"
        accurateButtonText = "This playlist is accurate!"
      }

      addToSpotifyButton = <button id={this.state.selectedPlaylist} className='add-to-spotify' onClick={this.addToSpotify} disabled={status}>{buttonText}</button>
      markAsAccurate = <button id={this.state.selectedPlaylist} className='mark-as-accurate' onClick={this.markAsAccurate} disabled={accurateStatus}>{accurateButtonText}</button>
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

      header =
        <PlaylistHeader
          key={this.state.playlist.id}
          id={this.state.playlist.id}
          genres={this.state.playlist.genres}
          style={this.state.playlist.audio_feature.activity_name}
          length={this.state.playlist.tracks.length}
          />
    }
    return(
      <div >
        <div className="playlist-header-container">
          {header}
          {markAsAccurate}
          {addToSpotifyButton}
          {deleteButton}
        </div>
        <div className="track-list-container">
        TRACKS
        <hr />
          <div className="track-list">
            {tracks}
          </div>
        </div>
      </div>
    )
  }
}

export default PlaylistShowContainer;
