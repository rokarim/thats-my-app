import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      playlist: null,
      playerState: null
    }
    this.playNextTrack=this.playNextTrack.bind(this)
    this.playPrevTrack=this.playPrevTrack.bind(this)
    this.stop=this.stop.bind(this)
    this.loadPlaylist=this.loadPlaylist.bind(this)
    this.handlePlayerChange=this.handlePlayerChange.bind(this)
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
            this.state.player.addListener('player_state_changed', state => {

              this.setState({playerState: state.track_window.current_track});
              this.handlePlayerChange(state.track_window.current_track.id)
            });

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

  handlePlayerChange(track){
    this.props.displayNowPlaying(track)
  }

  playNextTrack(){
    this.state.player.nextTrack().then(() => {
      console.log('Skipped to next track!');
    });
    this.state.player.addListener('player_state_changed', state => { this.setState({playerState: state.track_window.current_track});
                                                                      this.handlePlayerChange(state.track_window.current_track.id)});
  }

  playPrevTrack(){
    this.state.player.previousTrack().then(() => {
      console.log('Set to previous track!');
    });
    this.state.player.addListener('player_state_changed', state => { this.setState({playerState: state.track_window.current_track});
                                                                      this.handlePlayerChange(state.track_window.current_track.id)});
  }

  stop(){
    this.state.player.pause().then(() => {
      console.log('Paused!');
    });
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
          if (response.status === 500){
            // window.location.href = '/users/sign_in'
          }
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => { console.log(body.body); })
      .catch(error => {
        console.error(`Error in fetch: ${error.message}`)
        // window.location.href = '/users/sign_in'
      });
  }

  render(){
    let nowPlaying = ""
    if(this.state.playerState !== null){
      nowPlaying = <p> {this.state.playerState.name} - {this.state.playerState.artists[0].name}</p>
    }
    return(
      <div className="player-container">
        <div className="now-playing">
          {nowPlaying}
        </div>
        <br />
        <br />
        <div className="player">
          <button className="player-controls" onClick={this.playPrevTrack}><i className="fas fa-backward"></i></button>
          <button className="player-controls" onClick={this.loadPlaylist}><i className="fas fa-play"></i></button>
          <button className="player-controls" onClick={this.stop}><i className="fas fa-stop"></i></button>
          <button className="player-controls" onClick={this.playNextTrack}><i className="fas fa-forward"></i></button>
        </div>
      </div>
    )
  }
}

export default Player;
