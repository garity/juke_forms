import React, {Component} from 'react';
import SongSelector from '../components/SongSelector';
import axios from 'axios';
// import Artists from '../components/Artists';

export default class SongSelectorContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedSong: 1,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      selectedSong: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.props.creatingNewPlaylist(this.state.currInput);
    // const playlistId = this.props.playlistId;
    console.log(this.state.selectedSong)
    this.props.addingSongToPlaylist(this.state.selectedSong)
  }

  render(){
    return (
      <div>
        <SongSelector songs={this.props.songs} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}
