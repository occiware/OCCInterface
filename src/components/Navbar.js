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

  /*look for schemes and their corresponding kinds, and dispatch to the store the correct datas*/
  getSchemes = (data) => {
    var schemes = {};
    for(var i=0; i<data.kinds.length; i++){
      if(data.kinds[i].scheme in schemes){
        schemes[data.kinds[i].scheme].push({title: data.kinds[i].title, term: data.kinds[i].term});
      }
      else{
        schemes[data.kinds[i].scheme] = [{title: data.kinds[i].title, term: data.kinds[i].term}];
      }
    }
    this.props.dispatch(actions.setCurrentSchemes(schemes));
  }

  updateBackendURL = () => {
    //we first reset the eventual previous message
    this.props.dispatch(actions.setOkMessage(''));

    //we define this to auto toolify hyperlinks on the code view
    var navbar = this;

    var backendURL = $('.backendURL .text').text();

    if(!backendURL.match(/^http:\/\//) && !backendURL.match(/^https:\/\//)){
      navbar.props.dispatch(actions.setErrorMessage('The URL needs to begin with http:// or https://  '));
    }
    else{
      var getSchemes = this.getSchemes;
      $.ajax({
        url: '/conf?proxyTarget='+backendURL,
        type: 'GET',
        success: function(data){
          //we now make a test request to make sure the target is accessible
          callAPI(
            'GET',
            '/-/',
            (data) => {
              window.backendURL = backendURL;
              navbar.props.dispatch(actions.setOkMessage('You are now using '+backendURL));
              navbar.props.dispatch(actions.setCurrentQueryPath('/-/'));
              navbar.props.dispatch(actions.setCurrentJson(data));

              //we use that datas to extract the schemes and their kinds
              getSchemes(data);
            },
            (xhr) => {
              navbar.props.dispatch(actions.setErrorMessage('Error connecting to '+backendURL));
            }
          );
        }
      });
    }
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
    //we retrieve the kinds of each one of the scheme
    var schemes = [];
    for(var scheme in this.props.schemes){
      schemes.push(<div className="item" key={scheme}>
        <i className="dropdown icon"></i>
        <span className="text">{scheme}</span>
          <div className="menu">
            {this.props.schemes[scheme].map((kind, i) => {
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

    if(window.integratedVersion === false){
      var serverSelection = <div className="ui item">
              <select className="ui fluid search dropdown backendURL" name="backendURL"onChange={() => {}}>
                {options}
              </select>
            <button className="ui button useButton" onClick={this.updateBackendURL}>Use</button>
          </div>;
    }
    else{
      var serverSelection = null;
    }

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
          <div className="ui item right navBarRight">
            {serverSelection}
          </div>
          <div className="ui item">
            <a href="https://github.com/Romathonat/OCCInterface" ><i className="big github icon"></i></a>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  currentURLServer: state.currentURLServer,
  schemes: state.currentSchemes
})

export default NavBar = connect(mapStateToProps)(NavBar);
