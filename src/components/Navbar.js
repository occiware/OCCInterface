import React from 'react';
import { connect } from 'react-redux';

import {callAPI} from '../utils.js';

import * as actions from '../actions/actionIndex.js';

import conf from '../../conf.js';

class NavBar extends React.Component{
  componentDidMount = () => {
    $('.ui.dropdown').dropdown();

    $('.ui.backendURL')
    .dropdown({
      allowAdditions: true
    })
  ;
  }

  updateBackendURL = () => {
    //we define this to auto toolify hyperlinks on the code view
    var navbar = this;

    var backendURL = $('.backendURL .text').text();

    $.ajax({
      url: '/conf?proxyTarget='+backendURL,
      type: 'GET',
      success: function(data){
        window.backendURL = backendURL;
        navbar.props.dispatch(actions.setOkMessage('You are now using '+backendURL));
        navbar.forceUpdate();
      },
      error: function(xhr){
        navbar.props.dispatch(actions.setErrorMessage('Error connecting to '+backendURL));
      }
    });
  }

  displayKind = (kind) => {
    var link = '/categories/'+kind;
    this.props.dispatch(actions.setCurrentQueryPath(link));
    this.props.dispatch(actions.setReadableCode());

    callAPI(
      'GET',
      link,
      (data) => {
        this.props.dispatch(actions.setCurrentJson(data));
      }
    )
  }



  render() {
    //we manage kinds
    var existingSchemes = this.props.getSchemes();
    var schemes = [];
    for(var scheme in existingSchemes){
      schemes.push(<div className="item" key={scheme}>
        <i className="dropdown icon"></i>
        <span className="text">{scheme}</span>
          <div className="menu">
            {existingSchemes[scheme].map((kind, i) => {
              return <div className="item" onClick={() => this.displayKind(kind.term)} key={kind.term}>{kind.title}</div>
            })}
          </div>
        </div>);
    }

    //we set the options of the backendURL
    var options = conf.serverPaths.map((path,i) => {
      return (
        <option value={path} key={i+path}>{path}</option>
      );
    })

    return (
      <div className="ui inverted menu navbar centered grid blue">
        <div className="ui container wrapNavbar">
          <a className="brand item largefont">OCCInterface</a>
          <a className="ui dropdown item">
            Select Kind
            <i className="dropdown icon"></i>
            <div className="menu">
              {schemes}
            </div>
          </a>
          <div className="ui input item right">
              <select className="ui fluid search dropdown backendURL" name="backendURL" value={this.props.currentURLServer} onChange={() => {}}>
                {/*<input type="text" className="ui input backendURL" value={this.props.currentURLServer} onChange={this.updateCurrentBackendURL} />*/}
                {options}
              </select>
            <button className="ui button useButton" onClick={this.updateBackendURL}>Use</button>
          </div>
          <a href="https://github.com/Romathonat/OCCInterface" className="item right">GitHub</a>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  currentURLServer: state.currentURLServer
})

export default NavBar = connect(mapStateToProps)(NavBar);
