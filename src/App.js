import React from 'react';
import { connect } from 'react-redux';

import Menu from './components/Menu.js';
import NavBar from './components/Navbar.js';
import Content from './components/Content.js';


export default class App extends React.Component{
  goToTop = () => {
    $('html, body').animate({
        scrollTop: 0
    }, 600);
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="ui container stackable grid" id="mainContainer">
          <Menu readings={this.props.route.readings}/>
          {/*<Content reading={this.props.route.currentReading} goToTop={this.goToTop}/>*/}

          <div className="ui icon button goTop" onClick={this.goToTop}>
            <i className="arrow up icon centered"></i>
          </div>
        </div>
      </div>
    );
  }
}
