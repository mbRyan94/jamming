import React from 'react';
import './Modal.css';

class Modal extends React.Component {
    displayText() {
        if (this.props.isAdded) {
            return (
                <h2 className="modal-text">Your new Playlist has been successfully saved!</h2>
            );
        } else {
            return (
                <h2 className="modal-text">Ups, something went wrong. Please try again!</h2>
            );

        }
    }


    render() {
        return(
            <div className="modal" id="simpleModal">
                <div className="model-content">
                    <div className="modal-header">
                    </div>
                    <div className="modal-body">
                        <i src="./tick.png"></i>
                        <h2></h2>
                        <p>Enjoy your new Playlist!</p>
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
        ); 
    }
}