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
    this.state = {searchResults: [],
    playlistName: 'Test',
    playListTracks: []
  };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }


  search(term) {
    console.log(term);
    Spotify.search(term).then(track => {
    this.setState({searchResults: track});
    });
  }

  addTrack(track) {
    let playList = this.state.playListTracks;
    if (!this.state.playListTracks.find(playListTrack => track.id === playListTrack.id)){
      playList.push(track);
    }
      this.setState({playListTracks: playList});
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
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(
      this.setState({playlistName: 'New Playlist'}),
      this.setState({searchResults: []}),
      this.setState({playListTracks: []})
    );
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
