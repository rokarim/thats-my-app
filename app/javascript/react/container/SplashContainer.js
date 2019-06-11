import React from 'react';

class SplashContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.showVideo = this.showVideo.bind(this)
  }

  showVideo(){
    this.setState({visible: true})
  }

  render(){
    let video = <div><br /><h3> Don't have an Spotify account?</h3> <button onClick={this.showVideo}> Please check this out!</button></div>
    if (this.state.visible === true){
      video = <iframe src="https://player.vimeo.com/video/337147402" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
    }

    return(
      <div className='splash-container'>
        <div className='splash-message'>
          <h1>Generate playlists choosing your preferences!</h1>
          {video}
        </div>
      </div>
    )
  }
}

export default SplashContainer;
