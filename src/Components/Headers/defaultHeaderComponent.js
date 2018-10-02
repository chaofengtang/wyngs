import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
          <Link className="logo CenteredVertically" to="/">
            <img src="https://www.wyng.com/wp-content/themes/wyng/dist/img/wyng-logo.svg" alt="Wyng Digital &amp; Social Marketing Campaign Platform"/>
            <span className="SubTitle">PHOTO gallery</span>
          </Link>
      </header>
    );
  }
}

export default Header;
