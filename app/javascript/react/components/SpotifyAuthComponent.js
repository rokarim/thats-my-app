import React from 'react';
import { Link } from 'react-router';

class SpotifyAuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div>
        <Link to ='/api/v1/login'><p>Sign in with Spotify</p></Link>
      </div>
    )
  }
}

export default SpotifyAuthComponent;
