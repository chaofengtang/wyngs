import React, { Component } from 'react';
import FileUploader from './../UploadComponents/FileUploader';

class Upload extends Component {
  render() {
    return (
      <div className="UploadContainer AbsoluteCenter">
        <FileUploader />
      </div>
    );
  }
}

export default Upload;
