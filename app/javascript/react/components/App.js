import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import RootContainer from '../container/RootContainer'
import SplashContainer from '../container/SplashContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={SplashContainer}/>
      <Route path="/playlists" component={RootContainer}/>
    </Router>
  )
}

export default App
