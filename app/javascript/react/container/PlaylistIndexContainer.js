import React from 'react';
import PlaylistTile from '../components/PlaylistTile'

class PlaylistIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      selectedPlaylist: null
    }
    this.setPlaylist=this.setPlaylist.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({playlists: newProps.playlists})
    if (newProps.selectedPlaylist !== this.state.selectedPlaylist){
      this.setState({selectedPlaylist: newProps.selectedPlaylist})
    }
  }

  setPlaylist(event){
    this.props.setPlaylist(parseInt(event.target.id))
  }

  render(){
    let className = ""
    let playlists = this.state.playlists.map(playlist=>{
      if (playlist.id === this.state.selectedPlaylist){
        className = "selected"
      } else {
        className = ""
      }
      return(
        <PlaylistTile
          key={playlist.id}
          id={playlist.id}
          name={playlist.name}
          className={className}
          setSelectedPlaylist={this.setPlaylist}
        />
      )
    })
    return(
      <div className="row medium-12 large-12">
        <div>
          <div className="index-title">
            PLAYLISTS
          </div>
          <i onClick={this.props.showForm} className="fas fa-plus"></i>
        </div>
      <hr />
        <div className="list-container">
          {playlists}
        </div>
      </div>
    )
  }
}

export default PlaylistIndexContainer;
