import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      playlist: null
    }
    this.playNextTrack=this.playNextTrack.bind(this)
    this.loadPlaylist=this.loadPlaylist.bind(this)
  }

  componentWillReceiveProps(newProps){
    this.setState({playlist: newProps.playlist})
  }

  componentDidMount(){
    window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQBOQZf3ir4z66g20cnXwfeJsNs1TlyDRZ4m5SiV4zgUwe6pgwEyKXxHGZBYsYE7hr4tEmq2ndcO0GlyJFazOZisyBYQgUhBkjmZFC100Z2V28IBlGoPHB4tnPO9_p88bx2e-pQvHfa3_rSGzfyCEESCvMyBYLsBijUPek96Yg';
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

  playNextTrack(){
    this.state.player.getCurrentState().then(state => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK');
        return;
      }

      let {
        current_track,
        next_tracks: [next_track]
      } = state.track_window;

      console.log('Currently Playing', current_track);
      console.log('Playing Next', next_track);
    })
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
            window.location.href = '/users/sign_in'
          }
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => { })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <div>
        <button onClick={this.loadPlaylist}>Next</button>
      </div>
    )
  }
}

export default Player;
