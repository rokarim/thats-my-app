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

  render(){
    let tracks = "No tracks to show"
    let deleteButton = ""
    if (this.state.selectedPlaylist !== null && this.state.playlist.tracks !== undefined){
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
        {deleteButton}
        {tracks}
      </div>
    )
  }
}

export default PlaylistShowContainer;
