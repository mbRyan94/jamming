import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track';

class Tracklist extends React.Component {
  render () {
    return (
      <div className="TrackList">
          {
            this.props.tracks.map(track => {
              return <Track isRemove={this.props.isRemove} onRemove={this.props.onRemove} onAdd={this.props.onAdd} key={track.id} track={track}/>;
            })
          }
      </div>
    );
  }
}

export default Tracklist;
