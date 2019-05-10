import React from 'react';
import PlaylistTile from '../components/PlaylistTile'

class PlaylistIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    }
    this.setPlaylist=this.setPlaylist.bind(this)
  }

  componentDidMount(){
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

  setPlaylist(event){
    this.props.setPlaylist(parseInt(event.target.id))
  }

  render(){
    let playlists = this.state.playlists.map(playlist=>{
      return(
        <PlaylistTile
          key={playlist.id}
          id={playlist.id}
          name={playlist.name}
          setSelectedPlaylist={this.setPlaylist}
        />
      )
    })
    return(
      <div>
      PLAYLISTS
      <hr />
        {playlists}
      </div>
    )
  }
}

export default PlaylistIndexContainer;
