import React, { Component } from 'react';
import firebase from './../../firebase';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';
import Dropzone from 'react-dropzone';
import GalleryViewer from './GalleryViewer';

const imageMaxSize = 5000000;  //5mb max accepted file
const acceptedFileTypes = ['image/x-png', 'image/png', 'image/jpeg', 'image/jpg', 'image/gif']; //accepted image formats

class FileUploader extends Component {
  constructor() {
    super();
    this.state = {
      selectedFiles: [],
      didUpload: false
    }
    this.fileUpload = this.fileUpload.bind(this);
  }

  //for files too large, reject then alert
  verifySize = (files) => {
    var currentFiles = [];
    var currentFilesNames = "";

    files.forEach(function(item) {
      if (item.size > imageMaxSize) {
        currentFiles.push(item);
      }
    })
    if (currentFiles.length > 0) {
      currentFiles.forEach(function(item) {
        currentFilesNames = currentFilesNames + item.name + " ";
      });
      alert("Files: " + currentFilesNames + "is too large");
      return false;
    }
    return true;
  }

  //for non accepted formats, reject then alert
  verifyType = (files) => {
    var currentFiles = [];
    var currentFilesNames = "";

    files.forEach(function(item) {
      if (!acceptedFileTypes.includes(item.type)) {
        currentFiles.push(item);
      }
    })
    if (currentFiles.length > 0) {
      currentFiles.forEach(function(item) {
        currentFilesNames = currentFilesNames + item.name + " ";
      });
      alert("Files: " + currentFilesNames + "is not an accepted file type");
      return false;
    }
    return true;
  }

  handleOnDrop = (files, rejectedFiles) => {
    const allFiles = files.concat(rejectedFiles);
    if (allFiles.length < 6) {
      if (this.verifyType(allFiles)) {
        if (this.verifySize(allFiles)) {
          this.setState({
            selectedFiles: allFiles
          })
        }
      }
    } else {
      alert("Please only upload up to 5 photos max");
    }
  }

  clearSelection = () => {
    this.setState({
      selectedFiles: []
    })
  }

  fileUpload = () => {
    var uploadFail = false;
    this.state.selectedFiles.forEach(function(item) {
      var storageRef = firebase.storage().ref('/photos/' + item.name);
      var uploadTask = storageRef.put(item);
      uploadTask.on('state_changed', function(snapshot) {
      }, function(error) {
        uploadFail = uploadFail || true;
      }, function() {
        uploadFail = uploadFail || false;
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          var id =  Date.now();
          firebase.database().ref('photos/' + id).set({
            address: downloadURL,
            votes: 0
          });
        });
      });
    })
    if (!uploadFail) {
      console.log("Successfully uploaded all files");
      this.setState({
        didUpload: true
      })
    }
  }
  
  render() {
    
    const isNotEmpty = this.state.selectedFiles.length !==0? true : false;

    if (!this.state.didUpload) {
      return (
        <div>
          <div className="FileUploader Side-by-side">
            <div className="UploadDiv">
              <Dropzone className="FileDropzone" onDrop={this.handleOnDrop} maxSize={imageMaxSize} multiple={true} accept={acceptedFileTypes}>
                <div className="Side-by-side">
                  <i className="material-icons" style={{padding: '4px'}}> add_box</i>
                  <span>Drop files here </span> 
                </div>
              </Dropzone>
              <div className="ButtonBox">
                <Button className="ClearButton" onClick={this.clearSelection} disabled={!isNotEmpty} size="lg">Clear Selection</Button>
                <Button className="UploadButton" onClick={this.fileUpload} disabled={!isNotEmpty} size="lg">Upload</Button>
              </div>
            </div>
            <div className="UploadDiv">
              <h1> Create Your Gallery </h1>
              <p> Upload upto 5 files </p>
              <p> Max image size is 5mb </p>
              <p> only excepts x-png, png, jpeg, jpg, and gif files</p>
            </div>
          </div>
          <div className="GalleryContainer"> 
            <GalleryViewer images={this.state.selectedFiles}/>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ThankYou AbsoluteCenter">
          <h1>Thanks for uploading your gallery</h1>
          <p>Click below to view galleries</p>
          <Button className="PurposeButton VoteButton" tag={Link} to="/Vote" size="lg">Vote</Button>
        </div>
      )
    }
  }
}

export default FileUploader;
