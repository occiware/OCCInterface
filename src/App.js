import React from 'react';
import { connect } from 'react-redux';

import Menu from './components/Menu.js';
import NavBar from './components/Navbar.js';
import Content from './components/Content.js';

import {callAPI} from './utils.js';

import * as actions from './actions/actionIndex.js';

class App extends React.Component{
  componentDidMount = () => {
    $('.ui.sticky')
      .sticky({
        context: '#mainContainer'
      })
    ;

    $(window).scroll(function () {
      if ($(this).scrollTop() > 150) {
          $('.goTop').addClass('show');
      } else {
          $('.goTop').removeClass('show');
      }
    });
  }

  goToTop = () => {
    $('html, body').animate({
        scrollTop: 0
    }, 600);
  }

  render() {
    //we retrieve the correct currentReading of the route
    //default:
    var currentReading = '';

    // for(var i=0; i<this.props.route.readings.length; i++){
    //   if(this.props.route.readings[i].path === this.props.location.pathname){
    //     currentReading = this.props.route.readings[i].component;
    //     break;
    //   }
    // }

    return (
      <div>
        <NavBar />
        <div className="ui container stackable grid" id="mainContainer">
          <Menu/>
          <Content reading={currentReading} goToTop={this.goToTop}/>

          <div className="ui icon button goTop" onClick={this.goToTop}>
            <i className="arrow up icon centered"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default App = connect()(App);
