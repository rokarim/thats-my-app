import React from 'react';
import TrackTile from '../components/TrackTile'
class PlaylistShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylist: this.props.playlist,
      playlist: [],
      message: ""
    }
    this.getTracks=this.getTracks.bind(this)
    this.deletePlaylist=this.deletePlaylist.bind(this)
  }

  componentWillReceiveProps() {
    this.setState({selectedPlaylist: this.props.playlist})
    if(this.state.selectedPlaylist !== null){
      this.getTracks()
    }
  }

  componentDidMount(){
    if(this.state.selectedPlaylist !== null){
      this.getTracks()
    }
  }

  getTracks(){
    fetch(`/api/v1/playlists/${this.state.selectedPlaylist}`,
          {credentials: 'same-origin'})
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ playlist: body })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deletePlaylist(){
    if (confirm('Please confirm')){
      fetch(`/api/v1/playlists/${this.state.selectedPlaylist}`, {
        method: 'DELETE',
        credentials: 'same-origin'
      })
      .then((result) => { this.setState({selectedPlaylist: null }) })
    }
  }

  render(){
    let tracks = "No tracks to show"
    let deleteButton = ""
    if (this.state.selectedPlaylist !== null && this.state.playlist.tracks !== undefined && this.state.playlist.tracks.length !== 0){
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
      <div>
        {deleteButton}
      </div>
        {tracks}
      </div>
    )
  }
}

export default PlaylistShowContainer;
