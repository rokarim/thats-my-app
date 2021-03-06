import React from 'react';
import ActivityTile from '../components/ActivityTile'
import GenreTile from '../components/GenreTile'
import TextField from '../components/TextField'
import FormErrors from '../components/FormErrors'
import ToolTip from '../components/ToolTip'

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      selectedActivity: null,
      selectedGenres: [],
      searchString: "",
      name: "",
      formErrors: {},
      tooltipVisible: false,
      position: {left: 0, top: 0}
    }
    this.handleClickActivities = this.handleClickActivities.bind(this)
    this.handleClickGenre = this.handleClickGenre.bind(this)
    this.handleClickUnselectGenre = this.handleClickUnselectGenre.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.validateName = this.validateName.bind(this)
    this.validateActivity = this.validateActivity.bind(this)
    this.validateGenre = this.validateGenre.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleTooltip=this.handleTooltip.bind(this)
  }

  componentDidMount(){
    this.setState({activities: this.props.activities})
  }

  handleClickActivities(event){
    this.setState({selectedActivity: event.target.id})
  }

  handleClickGenre(event){
    if (this.state.selectedGenres.length < 2 &&
        this.state.selectedGenres.find(item => item.id === event.target.id)=== undefined){
      let selectedArray = this.state.selectedGenres
      selectedArray.push({id: event.target.id, name: event.target.innerText})
      this.setState({selectedGenres: selectedArray,
                      searchString: "",
                      genres: []})
    }
  }

  handleClickUnselectGenre(event){
    let selectedArray = this.state.selectedGenres
    let genreToDelete = this.state.selectedGenres.find(item => item.id === event.target.id)
    selectedArray.splice(selectedArray.indexOf(genreToDelete), 1)
    this.setState({selectedGenres: selectedArray})
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSearch(event) {
    event.preventDefault()
    this.handleChange(event)
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
        this.setState({ genres: body})
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  handleClearForm(){
    this.setState({
      genres: [],
      selectedActivity: null,
      selectedGenres: [],
      searchString: "",
      name: "",
      errors: {}
    })
  }

  validateName(name){
    if (name.trim() === ""){
      let newError = { nameInput: 'Name cannot be empty' }
      this.setState({ formErrors: Object.assign({}, this.state.formErrors, newError) })
      return false
    } else {
      let errorState = this.state.formErrors
      delete errorState.nameInput
      this.setState({ formErrors: errorState })
      return true
    }
  }

  validateActivity(activity){
    if (activity === null){
      let newError = { selectedActivity: 'A style must be selected' }
      this.setState({ formErrors: Object.assign({}, this.state.formErrors, newError) })
      return false
    } else {
      let errorState = this.state.formErrors
      delete errorState.selectedActivity
      this.setState({ formErrors: errorState })
      return true
    }
  }

  validateGenre(genre){
    if (genre.length === 0){
      let newError = { selectedGenres: 'At least one genre must be selected' }
      this.setState({ formErrors: Object.assign({}, this.state.formErrors, newError) })
      return false
    } else {
      let errorState = this.state.formErrors
      delete errorState.selectedGenres
      this.setState({ formErrors: errorState })
      return true
    }
  }

  handleTooltip(e){
    this.setState({tooltipVisible: !this.state.tooltipVisible,
                  position: { left: e.clientX - window.innerWidth/2.1,
                              top: e.clientY - window.innerHeight/2.8} })
  }

  handleFormSubmit(event){
    event.preventDefault();
    if (this.validateName(this.state.name) && this.validateActivity(this.state.selectedActivity) && this.validateGenre(this.state.selectedGenres)){
    let formPayload ={
      name: this.state.name,
      activity: this.state.selectedActivity,
      genres: this.state.selectedGenres
    }
    this.props.formSubmit(formPayload)
    this.handleClearForm()
    }
  }

  render(){
    let activityClass = ""
    let activities = this.props.activities.map(activity => {
      if (activity.id == this.state.selectedActivity){
        activityClass = "selected"
      } else {
        activityClass = ""
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
        <GenreTile
          key={genre.id}
          id={genre.id}
          name={genre.name}
          handleClick={this.handleClickGenre}
        />
      )
    })

    let selectedGenres = this.state.selectedGenres.map( genre => {
      return(
        <GenreTile
          key={genre.id}
          id={genre.id}
          name={genre.name}
          class="selected"
          handleClick={this.handleClickUnselectGenre}
        />
      )
    })

    let tooltip = ""
    if(this.state.tooltipVisible === true){
      tooltip = <ToolTip
                  position={"left"}
                  style={this.state.position}
                  title={"Close"}/>
    }

    return(
      <div>
      <i className="fas fa-times" onClick={this.props.handleFormVisibility} onMouseOver={this.handleTooltip} onMouseOut={this.handleTooltip}></i>
        <h3>Create a Playlist</h3>
        <div className='errors-display-container'>
          <FormErrors
            formErrors={this.state.formErrors}
            />
        </div>
        <form className="form-new-playlist" onSubmit={this.handleFormSubmit}>
        <div className="row">
            <TextField
              className="input-label"
              content={this.state.name}
              label='Name'
              name='name'
              handlerFunction={this.handleChange}
              />
              <br />
            <div className="columns large-6 activity-form-container">
              Select one style:
              <div className="activities-container">
                {activities}
              </div>
            </div>
            <div className="columns large-6 genre-form-container">
              Select up to 2 genres:
              <div className="selected-genres-container">
                {selectedGenres}
              </div>
              <input className="inputField" type='text' name='searchString' value={this.state.searchString} onChange={this.handleSearch}/>
              <div className="genres-container">
                {genres}
                {tooltip}
              </div>
            </div>
          </div>
          <input className="generate-button" type="submit" value="Generate" />
        </form>
      </div>
    )
  }
}

export default FormContainer;
