import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';

class Homepage extends Component {
  render() {
    return (
      <div className="container-fluid">
          <div className="Selector AbsoluteCenter">
            <div className="Welcome">
              <h1>Welcome to PHOTO gallery by WYNG</h1>
              <p>Would you like to upload a picture or vote on your favorite photo?</p>
            </div>
            <div className="ButtonContainer">
              <Button className="PurposeButton UploadButton" tag={Link} to="/Upload" size="lg">Upload</Button>
              <Button className="PurposeButton VoteButton" tag={Link} to="/Vote" size="lg">Vote</Button>
            </div>
          </div>
      </div>
    );
  }
}

export default Homepage;
