import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import SpotifyAuthComponent from './SpotifyAuthComponent'
import RootContainer from '../container/RootContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={SpotifyAuthComponent}/>
      <Route path="/api/v1/login" component={RootContainer}/>
      <Route path="/playlists" component={RootContainer}/>
    </Router>
  )
}

export default App

// <Route path="/playlists/new" component={NewPlaylistContainer}/>
