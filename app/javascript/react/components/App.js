import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import SpotifyAuthComponent from './SpotifyAuthComponent'
import PlaylistContainer from '../container/PlaylistContainer'
import NewPlaylistContainer from '../container/NewPlaylistContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={SpotifyAuthComponent}/>
      <Route path="/api/v1/login" component={SpotifyAuthComponent}/>
      <Route path="/playlists" component={PlaylistContainer}/>
      <Route path="/playlists/new" component={NewPlaylistContainer}/>
    </Router>
  )
}

export default App
