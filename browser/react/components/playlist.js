import React, {Component} from 'react';
import Songs from './Songs';
import SongSelector from './SongSelector';
import SongSelectorContainer from '../containers/SongSelectorContainer.js';


class Playlist extends Component {

	componentDidMount (){
		const playlistId = this.props.routeParams.playlistId;
		// console.log("playlistId = ", playlistId);
		const getPlaylist = this.props.getPlaylist;
		getPlaylist(playlistId);
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.routeParams.playlistId !== this.props.routeParams.playlistId){
			const getPlaylist = this.props.getPlaylist;
			getPlaylist(nextProps.routeParams.playlistId);
		}
	}

	render(){
		const playlist = this.props.selectedPlaylist;
		// console.log("playlist = ", playlist);
		return (
			<div>
				<h3>{ playlist.name }</h3>
				<Songs songs={playlist.songs} currentSong={this.props.currentSong} isPlaying={this.props.isPlaying} toggleOne={this.props.toggleOne}/> {/** Hooray for reusability! */}
				{ playlist.songs && !playlist.songs.length && <small>No songs.</small> }
				<hr />
				<SongSelectorContainer addingSongToPlaylist={this.props.addingSongToPlaylist} songs={this.props.allSongs} playlistId={playlist.id}/>
			</div>
		)
	}
}

export default Playlist;
