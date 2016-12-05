import React, { Component } from 'react';
import {browserHistory} from 'react-router';

import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import Filter from './FilterableArtistsContainer';

import { convertAlbum, convertAlbums, convertSong, skip } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.creatingNewPlaylist = this.creatingNewPlaylist.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.addingSongToPlaylist = this.addingSongToPlaylist.bind(this);
  }

  componentDidMount () {

    Promise
      .all([
        axios.get('/api/albums/'),
        axios.get('/api/artists/'),
        axios.get('/api/playlists'),
        axios.get('/api/songs')
      ])
      .then(res => res.map(r => r.data))
      .then(data => this.onLoad(...data));

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

 creatingNewPlaylist(newName){
    axios.post('/api/playlists', {
      name: newName
    })
    .then(res => res.data)
    .then(playlist => {
        this.setState({
          playlists: [...this.state.playlists, playlist]
        })
        const path = `/playlists/${playlist.id}`
        browserHistory.push(path);

    })
    .catch(console.err);
  }

  addingSongToPlaylist(songId){
    axios.post(`/api/playlists/${this.state.selectedPlaylist.id}/songs`,{
      id: songId
    })
    .then(res => res.data)
    .then(song => {
      let playlist = this.state.selectedPlaylist
      playlist.songs = playlist.songs.push(song)

      this.setState({
        selectedPlaylist: playlist
      })
    })
  }


  getPlaylist(playlistId){
    axios.get(`/api/playlists/${playlistId}`)
    .then(res => res.data)
    .then(playlist => {
      playlist.songs = playlist.songs.map(convertSong);
      this.setState({selectedPlaylist: playlist})
    })
    .catch(console.err);
  }

  onLoad (albums, artists, playlists, songs) {
    this.setState({
      albums: convertAlbums(albums),
      artists: artists,
      playlists: playlists,
      allSongs: songs
    });
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  selectArtist (artistId) {
    Promise
      .all([
        axios.get(`/api/artists/${artistId}`),
        axios.get(`/api/artists/${artistId}/albums`),
        axios.get(`/api/artists/${artistId}/songs`)
      ])
      .then(res => res.map(r => r.data))
      .then(data => this.onLoadArtist(...data));
  }

  onLoadArtist (artist, albums, songs) {
    songs = songs.map(convertSong);
    albums = convertAlbums(albums);
    artist.albums = albums;
    artist.songs = songs;

    this.setState({ selectedArtist: artist });
  }

  render () {

    const props = Object.assign({}, this.state, {
      toggleOne: this.toggleOne,
      toggle: this.toggle,
      selectAlbum: this.selectAlbum,
      selectArtist: this.selectArtist,
      creatingNewPlaylist: this.creatingNewPlaylist,
      getPlaylist: this.getPlaylist,
      addingSongToPlaylist: this.addingSongToPlaylist,
    });

    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar playlists={this.state.playlists} />
        </div>
        <div className="col-xs-10">
        {
          this.props.children && React.cloneElement(this.props.children, props)
        }
        </div>
        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
