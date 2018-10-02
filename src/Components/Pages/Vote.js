import React, { Component } from 'react';
import firebase from './../../firebase';
import Gallery from './../VoteComponents/Gallery';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Vote extends Component {
  constructor() {
    super();
    this.state = {
      photoSet: []
    };
    this.onVote = this.onVote.bind(this);
  }

  getPhotos() {
    var tmpPhotoArray = [];
    let parent = this;
    firebase.database().ref('/photos/').on("value", function(snapshot) {
      console.log(snapshot.val());
      for (var key in snapshot.val()) {
        tmpPhotoArray.push({id: key, src: snapshot.val()[key]});
      }
      parent.setState({
        photoSet: tmpPhotoArray,

      });
    }, function (error) {
      console.log("Error: " + error.code);
    });
  }

  componentDidMount() {
    this.getPhotos();
  }

  onVote(id) {
    cookies.set('didVote', true, { path: '/' });

    var tmp;
    var target = firebase.database().ref('/photos/' + id + '/votes');
    target.on("value", function(snapshot) {
      tmp = snapshot.val();
    }, function (error) {
      console.log("Error: " + error.code);
    });
    target.set(tmp + 1);
    this.getPhotos();
  }

  render() {
    const didVote = !cookies.get('didVote') !== true;
    return (
      <div className="PhotoGallery">
        <Gallery images={this.state.photoSet} didVote={didVote} onVote={this.onVote}/>
      </div>
    );
  }
}

export default Vote;
