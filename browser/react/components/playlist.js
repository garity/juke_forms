import React, {Component} from 'react';
import Songs from './Songs';

class Playlist extends Component {
	componentDidMount (){
		const playlistId = this.props.routeParams.playlistId;
		console.log("playlistId = ", playlistId);
		const getPlaylist = this.props.getPlaylist;
		getPlaylist(playlistId);
	}

	render(){
		const playlist = this.props.selectedPlaylist;
		console.log("playlist = ", playlist);
		return (
			<div>
				<h3>{ playlist.name }</h3>
				<Songs songs={playlist.songs} currentSong={this.props.currentSong} isPlaying={this.props.isPlaying} toggleOne={this.props.toggleOne}/> {/** Hooray for reusability! */}
				{ playlist.songs && !playlist.songs.length && <small>No songs.</small> }
				<hr />
			</div>
		)
	}
}

export default Playlist;