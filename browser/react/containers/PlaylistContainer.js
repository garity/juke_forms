import React, {Component} from 'react';
import NewPlaylist from '../components/NewPlaylist';
import axios from 'axios';
// import Artists from '../components/Artists';

export default class PlaylistContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      currInput: '',
      // warningMsg: null,
      userTyped: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      currInput: event.target.value,
      userTyped: true
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.creatingNewPlaylist(this.state.currInput);
    this.setState({currInput: '', userTyped: false});
  }

  invalidInput(){
    return (this.state.currInput.length === 0 ||
            this.state.currInput.length > 16)
  }

  printError(){
    if (this.invalidInput() && this.state.userTyped){
      return <div className="alert alert-warning">Please enter a name</div>
    } else return null;
    // return this.state.warningMsg
  }

 

  render(){
    return (
      <div>
        <NewPlaylist invalidInput={this.invalidInput()} handleChange={this.handleChange} handleSubmit={this.handleSubmit} currentInput={this.state.currInput}/>
       {this.printError()}
      </div>
    )
  }
}
