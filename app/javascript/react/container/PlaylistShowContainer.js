import React from 'react';

class PlaylistShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylist: this.props.playlist,
      playlist: ""
    }
  }

  componentDidMount(){
    if(this.state.selectedPlaylist !== null){
      fetch(`/api/v1/playlists/${this.props.selectedPlaylist}`,
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
          debugger
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  }

  render(){
    // if (this.state.playlist.tracks !== null){
    //   let tracks = this.state.playlist.tracks.map(track =>{
    //     return(
    //       <div>track.name</div>
    //     )
    //   })
    // }
    return(
      <div>
      SHOW
        <ul>
        </ul>
      </div>
    )
  }
}

export default PlaylistShowContainer;
