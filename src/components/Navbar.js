import React from 'react';
import { connect } from 'react-redux';

export default class NavBar extends React.Component{
  componentDidMount = () => {
    $('.ui.dropdown').dropdown();
  }

  updateBackendURL = () => {
    window.backendURL = $('.backendURL').val();
  }

  render() {
    var currentProject = this.props.currentProject;

    if(!currentProject){
      currentProject = 'Default scheme';
    }

    return (
      <div className="ui inverted menu navbar centered grid blue">
        <div className="ui container wrapNavbar">
          <a className="brand item largefont">OCCInterface</a>
          <a className="ui dropdown item">
            {currentProject}
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className="item">a</div>
              <div className="item">b</div>
            </div>
          </a>
          <div className="ui labeled input item right">
            <div className="ui label">URL OCCI server </div>
            <input type="text" className="backendURL" />
            <button className="ui button useButton" onClick={this.updateBackendURL}>Use</button>
          </div>
          <a href="https://github.com/Romathonat/OCCInterface" className="item right">GitHub</a>
        </div>
      </div>
    );
  }
}
