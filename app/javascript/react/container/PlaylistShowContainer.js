import React from 'react';

class PlaylistShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: this.props.playlist,
      tracks: []
    }
  }

  componentDidMount(){
    if (this.state.playlist !== null){
      fetch(`/api/v1/playlists/2`,
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
          this.setState({ name: body.name,
                          tracks: body.tracks })
          debugger
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render(){
    let tracks = this.state.tracks.map(track=>{
      <div>track.name</div>
    })
    return(
      <div>
      SHOW
        <ul>
          {tracks}
        </ul>
      </div>
    )
  }
}

export default PlaylistShowContainer;
