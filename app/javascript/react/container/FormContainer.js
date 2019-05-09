import React from 'react';
import ActivityTile from '../components/ActivityTile'
import TextField from '../components/TextField'

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      selectedActivity: null,
      selectedGenres: [],
      searchString: "",
      playlist: [],
      name: ""
    }
    this.handleClickActivities = this.handleClickActivities.bind(this)
    this.handleClickGenre = this.handleClickGenre.bind(this)
    this.handleClickUnselectGenre = this.handleClickUnselectGenre.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount(){
    this.setState({activities: this.props.activities})
  }

  handleClickActivities(event){
    this.setState({selectedActivity: event.target.id})
  }

  handleClickGenre(event){
    if (this.state.selectedGenres.length < 2){
      let selectedArray = this.state.selectedGenres
      selectedArray.push({id: event.target.id, name: event.target.innerText})
      this.setState({selectedGenres: selectedArray})
    } else {
      console.log("You can only choose up to 2 genres");
    }
  }

  handleClickUnselectGenre(event){
    let selectedArray = this.state.selectedGenres
    let index = selectedArray.indexOf({id: event.target.id, name: event.target.innerText})
    selectedArray.splice(index, 1)
    this.setState({selectedGenres: selectedArray})
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSearch(event) {
    event.preventDefault()
    const body = JSON.stringify({
      search_string: this.state.searchString
   })
   fetch('/api/v1/genres/search.json',
     { method: "POST",
      body: body,
      credentials: 'same-origin',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        return response.json();
      })
      .then(body => {
        this.setState({ genres: body, searchString: ""})
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))  }

  handleFormSubmit(event){
    event.preventDefault();
    let formPayload ={
      name: this.state.name,
      activity: this.state.selectedActivity,
      genres: this.state.selectedGenres
    }
    this.props.formSubmit(formPayload)
  }

  render(){
    let activityClass = ""
    let activities = this.props.activities.map(activity => {
      if (activity.id === this.state.selectedActivity){
        activityClass = "selected"
      }
      return(
        <ActivityTile
          key={activity.id}
          id={activity.id}
          name={activity.activity_name}
          handleClick={this.handleClickActivities}
          class={activityClass}
        />
      )
    })

    let genres = this.state.genres.map( genre => {
      return(
        <ActivityTile
          key={genre.id}
          id={genre.id}
          name={genre.name}
          handleClick={this.handleClickGenre}
        />
      )
    })

    let selectedGenres = this.state.selectedGenres.map( genre => {
      return(
        <ActivityTile
          key={genre.id}
          id={genre.id}
          name={genre.name}
          class="selected"
          handleClick={this.handleClickUnselectGenre}
        />
      )
    })

    return(
      <div>
        <h3>New Playlist</h3>
        <form onSubmit={this.handleFormSubmit}>
          <TextField
            className="input-label"
            content={this.state.name}
            label='Name'
            name='name'
            handlerFunction={this.handleChange}
            />
          Choose an activity:
          <hr />
          <div className="activities-container">
            {activities}
          </div>
          <br />
          <br />
          Select up to 2 genres:
          <hr />
          <div className="activities-container">
            {selectedGenres}
          </div>
          <input className="green-button" type="submit" value="Generate" />
        </form>
        <form className= "search-bar" onSubmit={this.handleSearch}>
          <input className="inputField" type='text' name='searchString' value={this.state.searchString} onChange={this.handleChange} />
          <input className="Search green-button" type='submit' value='Search' />
        </form>
        <div className="activities-container">
          {genres}
        </div>
      </div>
    )
  }
}

export default FormContainer;
