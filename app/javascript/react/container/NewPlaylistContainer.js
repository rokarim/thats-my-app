import React from 'react';
import FormContainer from './FormContainer'

class NewPlaylistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      user_info: null
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount(){
    fetch('/api/v1/selections/new')
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
        this.setState({activities: body.audio_features,
                       user_info: body.user_info})
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleFormSubmit(formPayload){
    formPayload.user_info = this.state.user_info
    fetch('/api/v1/selections', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formPayload)
    })
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
      if(body.error){
        this.setState({ errors: body.error })
      } else {
        this.props.setPlaylist(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render(){
    return(
      <div>
        <FormContainer
          user_info={this.state.user_info}
          activities={this.state.activities}
          formSubmit={this.handleFormSubmit}
          />
      </div>
    )
  }
}

export default NewPlaylistContainer;
