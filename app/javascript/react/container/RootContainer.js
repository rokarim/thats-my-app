import React from 'react';
import NewPlaylistContainer from './NewPlaylistContainer'
import PlaylistShowContainer from './PlaylistShowContainer'
import PlaylistIndexContainer from './PlaylistIndexContainer'

class RootContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylist: null,
      playlists: null,
      playlistToShow: null
    }
    this.getPlaylists = this.getPlaylists.bind(this)
    this.getPlaylistSelected = this.getPlaylistSelected.bind(this)
    this.refreshPlaylists = this.refreshPlaylists.bind(this)
    this.deletePlaylist = this.deletePlaylist.bind(this)
  }

  getPlaylists(){
    fetch('/api/v1/playlists',
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
        this.setState({playlists: body})
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount(){
    this.getPlaylists()
  }

  refreshPlaylists(playlist){
    let refreshedPlaylists = this.state.playlists
    refreshedPlaylists = refreshedPlaylists.concat(playlist)

    this.setState({playlistToShow: playlist,
                  selectedPlaylist: playlist.id,
                  playlists: refreshedPlaylists})
  }

  deletePlaylist(playlist){
    let updatedPlaylists = this.state.playlists
    let playlistToDelete = this.state.playlists.find(item => item.id === playlist)
    updatedPlaylists.splice(updatedPlaylists.indexOf(playlistToDelete), 1)
    this.setState({selectedPlaylist: null,
                    playlists: updatedPlaylists})
  }

  getPlaylistSelected(playlist){
    this.setState({selectedPlaylist: playlist,
                    playlistToShow: this.state.playlists.find(item => item.id === playlist)})
  }

  render(){
    return(
      <div className="row">
        <div className="columns medium-12 large-12 new-playlist-container">
          <NewPlaylistContainer
            setPlaylist={this.refreshPlaylists}
          />
        </div>
        <div className="row">
          <div className="columns medium-4 large-8 index-container">
            <PlaylistIndexContainer
              playlists={this.state.playlists}
              setPlaylist={this.getPlaylistSelected}
              selectedPlaylist={this.state.selectedPlaylist}
            />
          </div>
          <div className="columns medium-4 large-8 show-container">
            <PlaylistShowContainer
              selectedPlaylist={this.state.selectedPlaylist}
              playlistToShow={this.state.playlistToShow}
              setPlaylist={this.getPlaylistSelected}
              deletePlaylist={this.deletePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default RootContainer;
