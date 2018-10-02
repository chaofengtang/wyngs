import React, { Component } from 'react';

const overlay = {
  active: {visibility: 'visible'},
  inactive: {visibility: 'hidden'}
};

class GalleryViewer extends Component {

  render() {
    let parent = this;
    const overlayStyling = this.props.didVote? overlay.active : overlay.inactive;
    return (
      <div className="VotingGallery">
        <div className="VoteGreeting">
          {!this.props.didVote? (
            <h1>Vote for your favorite photo</h1>
          ) : (
            <h1>Thank you for voting</h1>
          )
          }
        </div>
        <div className="Gallery">
          {this.props.images.map(function(item, i) {
            return (
              <div className="PhotoContainer" key={i} id={item.id}>
                <img className="Photo" src={item.src.address} alt="" onClick={() => {parent.props.onVote(item.id)}} />
                <div className="VoteCount" style={overlayStyling}>{item.src.votes} <i className="material-icons">favorite</i></div>
              </div>
            );
          })}
        </div>
        <div className="Overlay" style={overlayStyling}> </div>
      </div>
    );
  }
}

export default GalleryViewer;
