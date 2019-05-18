import React from 'react';
import PlaylistTile from '../components/PlaylistTile'
import ToolTip from '../components/ToolTip'

class PlaylistIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      selectedPlaylist: null,
      tooltipVisible: false,
      position: {left: 0, top: 0}
    }
    this.setPlaylist=this.setPlaylist.bind(this)
    this.handleTooltip=this.handleTooltip.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({playlists: newProps.playlists})
    if (newProps.selectedPlaylist !== this.state.selectedPlaylist){
      this.setState({selectedPlaylist: newProps.selectedPlaylist})
    }
  }

  setPlaylist(event){
    this.props.setPlaylist(parseInt(event.target.id))
  }

  handleTooltip(e){
    this.setState({tooltipVisible: !this.state.tooltipVisible,
                  position: { left: e.clientX - (e.currentTarget.getBoundingClientRect().left)/2,
                              top: e.clientY - e.currentTarget.getBoundingClientRect().top} })
  }

  render(){
    let tooltip = ""
    if(this.state.tooltipVisible === true){
      tooltip = <ToolTip
                  position={"left"}
                  style={this.state.position}
                  title={"New Playlist"}/>
    }
    let className = ""
    let playlists = this.state.playlists.map(playlist=>{
      if (playlist.id === this.state.selectedPlaylist){
        className = "selected"
      } else {
        className = ""
      }
      return(
        <PlaylistTile
          key={playlist.id}
          id={playlist.id}
          name={playlist.name}
          className={className}
          setSelectedPlaylist={this.setPlaylist}
        />
      )
    })
    return(
      <div>
        <div className="index-title">
          PLAYLISTS
        </div>
        <i onClick={this.props.showForm} className="fas fa-plus" onMouseOver={this.handleTooltip} onMouseOut={this.handleTooltip}></i>
      <hr />
        <div className="list-container">
          {playlists}
        </div>
          {tooltip}
      </div>
    )
  }
}

export default PlaylistIndexContainer;
