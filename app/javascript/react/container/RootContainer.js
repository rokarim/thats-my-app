import React from 'react';
import NewPlaylistContainer from './NewPlaylistContainer'
import PlaylistShowContainer from './PlaylistShowContainer'
import PlaylistIndexContainer from './PlaylistIndexContainer'

class RootContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylist: null,
      user_info: {},
    }
    this.getPlaylistGenerated = this.getPlaylistGenerated.bind(this)
  }

  getPlaylistGenerated(playlist){
    this.setState({selectedPlaylist: playlist})
  }

  render(){
    return(
      <div className="row">
        <div className="row columns medium-12 large-8 new-playlist-container">
          <NewPlaylistContainer
            setPlaylist={this.getPlaylistGenerated}
            />
        </div>
        <div className="row columns medium-9 index-container">
        <PlaylistIndexContainer
        setPlaylist={this.getPlaylistGenerated}
        />
        </div>
        <div className="row columns medium-3 large-4 show-container">
        <PlaylistShowContainer
        playlist={this.state.selectedPlaylist}
        setPlaylist={this.getPlaylistGenerated}
        />
        </div>
      </div>
    )
  }
}

export default RootContainer;
