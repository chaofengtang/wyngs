import React, { Component } from 'react';

class GalleryViewer extends Component {


  render() {

    return (
      <div className="GalleryViewer Side-by-side">
        {this.props.images.map(function(item) {
          return (
            <div className="PhotoContainer" key={item.name}>
              <img className="Photo" alt="" src={URL.createObjectURL(item)}/>
            </div>
          );
        })}
      </div>
    );
  }
}

export default GalleryViewer;
