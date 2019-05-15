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
      playlistToShow: null,
      accurate: false,
      saved: false,
      formVisible: false
    }
    this.getPlaylists = this.getPlaylists.bind(this)
    this.getPlaylistSelected = this.getPlaylistSelected.bind(this)
    this.refreshPlaylists = this.refreshPlaylists.bind(this)
    this.deletePlaylist = this.deletePlaylist.bind(this)
    this.updateAccurate=this.updateAccurate.bind(this)
    this.updateSaved=this.updateSaved.bind(this)
    this.showForm=this.showForm.bind(this)
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
    refreshedPlaylists.unshift(playlist)

    this.setState({playlistToShow: playlist,
                  selectedPlaylist: playlist.id,
                  accurate: playlist.accurate,
                  saved: playlist.saved,
                  playlists: refreshedPlaylists})
  }

  deletePlaylist(playlist){
    let updatedPlaylists = this.state.playlists
    let playlistToDelete = this.state.playlists.find(item => item.id === playlist)
    updatedPlaylists.splice(updatedPlaylists.indexOf(playlistToDelete), 1)
    this.setState({selectedPlaylist: null,
                    playlists: updatedPlaylists})
  }

  getPlaylistSelected(playlistId){
    let playlist = this.state.playlists.find(item => item.id === playlistId)
    this.setState({selectedPlaylist: playlistId,
                    playlistToShow: playlist,
                    accurate: playlist.accurate,
                    saved: playlist.saved})
    this.getPlaylists()
  }

  updateAccurate(){
    this.setState({accurate: !this.state.accurate})
  }

  updateSaved(){
    this.setState({saved: !this.state.saved})
  }

  showForm(){
    this.setState({formVisible: !this.state.formVisible})
  }

  render(){
    let newPlaylist = ""
    let className = ""
    if (this.state.formVisible === true){
      className = "visible"
      newPlaylist =
        <NewPlaylistContainer
          className={className}
          changeFormVisibility={this.showForm}
          setPlaylist={this.refreshPlaylists}
        />
    }
    return(
      <div className="row root-container">
        <div className="row">
          <div className="index-container small-3 columns">
            <PlaylistIndexContainer
              playlists={this.state.playlists}
              setPlaylist={this.getPlaylistSelected}
              selectedPlaylist={this.state.selectedPlaylist}
              showForm={this.showForm}
            />
          </div>
          <div className="show-container small-8 columns">
            <PlaylistShowContainer
              selectedPlaylist={this.state.selectedPlaylist}
              playlistToShow={this.state.playlistToShow}
              accurate={this.state.accurate}
              saved={this.state.saved}
              updateAccurate={this.updateAccurate}
              updateSaved={this.updateSaved}
              setPlaylist={this.getPlaylistSelected}
              deletePlaylist={this.deletePlaylist}
            />
          </div>
        </div>
        <div className="new-playlist-container">
          {newPlaylist}
        </div>
      </div>
    )
  }
}

export default RootContainer;
