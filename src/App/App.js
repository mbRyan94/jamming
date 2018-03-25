import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../Components/SearchBar/SearchBar';
import SearchResults from '../Components/SearchResults/SearchResults';
import Playlist from '../Components/Playlist/Playlist';
import Spotify from '../util/Spotify';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [
      /*{
        name: 'Tiny Dancer',
        artist: 'Elton John',
        album: 'Madman across the water',
        id: 1
      },
      {
        name: 'Tiny Dancer',
        artist: 'Tim McGraw',
        album: 'Love Storys',
        id: 2
      }
    */
    ]
    ,

    playlistName: 'Test',
    playListTracks:
      [
        /*{
        name: 'Tiny Dancer',
        artist: 'Elton John',
        album: 'Madman across the water',
        id: 1
      }*/
    ]
  };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let onTracklist = false;
    this.state.playListTracks.forEach(playListTrack => {
      if (playListTrack.id === track.id) {
        onTracklist = true;
      }

      if (!onTracklist) {
        this.state.playListTracks.push(track);
        this.setState({playListTracks: this.state.playListTracks});
      }
    });
  }

  removeTrack(track) {
    const plTrack = this.state.playListTracks.filter(playListTrack => playListTrack.id !== track.id);
    this.setState({playListTracks: plTrack});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackUris = this.state.playListTracks.map(playListTrack => {
      return playListTrack.uri;
    });

  }

  search(searchTerm) {
    console.log(searchTerm);
    let results = Spotify.search(searchTerm);
    this.setState({searchResults: results});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playListTracks={this.state.playListTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
