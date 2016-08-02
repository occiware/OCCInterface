import React from 'react';
import { connect } from 'react-redux';

import Menu from './components/Menu.js';
import NavBar from './components/Navbar.js';
import Content from './components/Content.js';

import {callAPI} from './utils.js';

export default class App extends React.Component{
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

  //get the currentScheme to pass down to Navbar
  getSchemes = () => {
    var rootDatas;
    callAPI(
      'GET',
      '/-/',
      (data) => {
        rootDatas = data;
      },
      null,
      null,
      null,
      false
    );

    var schemes = {};

    for(var i=0; i<rootDatas.kinds.length; i++){
      if(rootDatas.kinds[i].scheme in schemes){
        schemes[rootDatas.kinds[i].scheme].push({title: rootDatas.kinds[i].title, term: rootDatas.kinds[i].term});
      }
      else{
        schemes[rootDatas.kinds[i].scheme] = [{title: rootDatas.kinds[i].title, term: rootDatas.kinds[i].term}];
      }
    }
    return schemes;
  }

  goToTop = () => {
    $('html, body').animate({
        scrollTop: 0
    }, 600);
  }

  render() {
    //we retrieve the correct currentReading of the route
    //default:
    var currentReading = this.props.route.readings[0].component;

    for(var i=0; i<this.props.route.readings.length; i++){
      if(this.props.route.readings[i].path === this.props.location.pathname){
        currentReading = this.props.route.readings[i].component;
        break;
      }
    }

    return (
      <div>
        <NavBar getSchemes={this.getSchemes} schemes={this.getSchemes()}/>
        <div className="ui container stackable grid" id="mainContainer">
          <Menu readings={this.props.route.readings}/>
          <Content reading={currentReading} goToTop={this.goToTop}/>

          <div className="ui icon button goTop" onClick={this.goToTop}>
            <i className="arrow up icon centered"></i>
          </div>
        </div>
      </div>
    );
  }
}
