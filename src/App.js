import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './Assets/css/default.min.css';

//components
import Header from './Components/Headers/defaultHeaderComponent';
import Footer from './Components/Footers/defaultFooterComponent';
import Homepage from './Components/Pages/HomePage';
import Upload from './Components/Pages/Upload';
import Vote from './Components/Pages/Vote';
import ErrorComp from './Components/Pages/Error';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />

          <Switch>
            <Route exact path='/' component={Homepage}/>
            <Route exact path='/upload' component={Upload}/>
            <Route exact path='/vote' component={Vote}/>
            <Route exact path='*' component={ErrorComp}/>
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
