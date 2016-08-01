import React from 'react';
import { connect } from 'react-redux';

import {callAPI} from '../utils.js';


export default class NavBar extends React.Component{
  componentDidMount = () => {
    $('.ui.dropdown').dropdown();
  }

  updateBackendURL = () => {
    //we define this to auto toolify hyperlinks on the code view
    window.backendURL = $('.backendURL').val();
    $.ajax({
      url: '/conf?proxyTarget='+window.backendURL,
      type: 'GET'
    });
  }

  render() {
    var currentProject = this.props.currentProject;

    if(!currentProject){
      currentProject = 'Default scheme';
    }

    var schemes = [];
    for(var scheme in this.props.schemes){
      schemes.push(<div className="item" key={scheme}>
        <i className="dropdown icon"></i>
        <span className="text">{scheme}</span>
          <div className="menu">
            {this.props.schemes[scheme].map((kind, i) => {
              return <div className="item">{kind}</div>
            })}
          </div>
        </div>);
    }

    return (
      <div className="ui inverted menu navbar centered grid blue">
        <div className="ui container wrapNavbar">
          <a className="brand item largefont">OCCInterface</a>
          <a className="ui dropdown item">
            {currentProject}
            <i className="dropdown icon"></i>
            <div className="menu">
              {schemes}
            </div>
          </a>
          <div className="ui input item right">
            <input type="text" placeholder="OCCI server" className="backendURL" />
            <button className="ui button useButton" onClick={this.updateBackendURL}>Use</button>
          </div>
          <a href="https://github.com/Romathonat/OCCInterface" className="item right">GitHub</a>
        </div>
      </div>
    );
  }
}
