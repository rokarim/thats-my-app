import React from 'react';

class PlaylistIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    }
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

  render(){
    let playlists = this.state.playlists.map(playlist=>{
      <div>playlist.name</div>
    })
    return(
      <div>
      {playlists}
      </div>
    )
  }
}

export default PlaylistIndexContainer;
