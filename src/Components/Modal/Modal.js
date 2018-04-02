import React from 'react';
import './Modal.css';
import image_success from './tick.png';
import image_failed from './cancel.png';

class Modal extends React.Component {
    /*
    displayText() {
        if (this.props.isRender) {
            return (
                <h2 className="modal-text">Your new Playlist has been successfully saved!</h2>
            );
        } else {
            return (
                <h2 className="modal-text">Ups, something went wrong. Please try again!</h2>
            );

        }
    }
    */


    render() {
        return(
            <div className="modal" id="simpleModal">
                <div className="modal-content">
                    <div className="modal-header">
                    </div>
                    <div className="modal-body">
                        <img alt="checkmark" width="20%" height="20%" src={this.props.isRender ? image_success : image_failed}></img>
                        <h2 className="modal-text">
                        {
                            this.props.isRender ? 'Your new Playlist has been successfully saved!' : 'Ups, something went wrong. Please try again!'
                        }
                        </h2>
                        <p>Enjoy your new Playlist!</p>
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
        ); 
    }
}

export default Modal;