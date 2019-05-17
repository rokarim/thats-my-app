import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      playlist: null
    }
    this.playNextTrack=this.playNextTrack.bind(this)
    this.playPrevTrack=this.playPrevTrack.bind(this)
    this.loadPlaylist=this.loadPlaylist.bind(this)
  }

  componentWillReceiveProps(newProps){
    this.setState({playlist: newProps.playlist})
  }

  componentDidMount(){
    fetch("/api/v1/spotify")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        loadPlayer(body.access_token)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

      let loadPlayer = (token) => {
        if(this.state.player === null){
          this.setState({player: new Spotify.Player({
              name: 'ThatsMyJam',
              getOAuthToken: cb => { cb(token); }
              })
            })
            // Error handling
            this.state.player.addListener('initialization_error', ({ message }) => { console.error(message); });
            this.state.player.addListener('authentication_error', ({ message }) => { console.error(message); });
            this.state.player.addListener('account_error', ({ message }) => { console.error(message); });
            this.state.player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            this.state.player.addListener('player_state_changed', state => { console.log(state); });

            // Ready
            this.state.player.addListener('ready', ({ device_id }) => {
              console.log('Ready with Device ID', device_id);
            });
            this.state.player.addListener('not_ready', ({ device_id }) => {
              console.log('Device ID has gone offline', device_id);
            });
            // Connect to the player!
            this.state.player.connect();
          }
      }
  }

  playNextTrack(){
    fetch('/api/v1/spotify/next', {
      method: 'POST',
      body: this.state.playlist.id,
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          // if (response.status === 500){
          //   window.location.href = '/users/sign_in'
          // }
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {  })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  playPrevTrack(){
    fetch('/api/v1/spotify/previous', {
      method: 'POST',
      body: this.state.playlist.id,
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          // if (response.status === 500){
          //   window.location.href = '/users/sign_in'
          // }
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {  })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  loadPlaylist(){
    fetch(`/api/v1/spotify/${this.state.playlist.id}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          // if (response.status === 500){
          //   window.location.href = '/users/sign_in'
          // }
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => { console.log(body.body); })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){

    return(
      <div className="player">
        <button className="player-controls" onClick={this.playPrevTrack}><i className="fas fa-backward"></i></button>
        <button className="player-controls" onClick={this.loadPlaylist}><i className="fas fa-play"></i></button>
        <button className="player-controls" onClick={this.playNextTrack}><i className="fas fa-forward"></i></button>
      </div>
    )
  }
}

export default Player;
