import React from 'react';
import { connect } from 'react-redux';

import Menu from './menu.js';
import NavBar from './components/navbar.js';
import Content from './content.js';


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
          <Menu/>
          <Content reading={this.props.children} goToTop={this.goToTop}/>

          <div className="ui icon button goTop" onClick={this.goToTop}>
            <i className="arrow up icon centered"></i>
          </div>
        </div>
      </div>
    );
  }
}
