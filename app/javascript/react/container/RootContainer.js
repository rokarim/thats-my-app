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
    debugger
    this.setState({selectedPlaylist: playlist})
  }

  render(){
    return(
      <div>
        <div className="">
          <NewPlaylistContainer
            setPlaylist={this.getPlaylistGenerated}
            />
        </div>
        <div className="">
          <PlaylistIndexContainer
            setPlaylist={this.getPlaylistGenerated}
            />
        </div>
        <div className="">
          <PlaylistShowContainer
            playlist={this.state.selectedPlaylist}
            />
        </div>
      </div>
    )
  }
}

export default RootContainer;
