import React from 'react';
import { connect } from 'react-redux';

import marked from 'marked';

// import * as actions from '../actions/actionIndex.js';
import {compute, storage, storagelink} from '../../samples/occi-infra.js';

import {callAPI} from '../utils.js';
import * as actions from '../actions/actionIndex.js';

class Reading extends React.Component{
  componentWillUpdate = (nextProps) => {
    //we make the animation only if we have a new reading
    if(nextProps.reading !== this.props.reading){
      $('.reading').transition('hide');
      $('.reading').transition('fade');
    }
  }

  componentDidUpdate = () => {
    //we transform all link of readings to make them playground-clickable
    this.replaceLinks();
  }

  componentDidMount = () => {
    this.replaceLinks();
    this.replaceSampleElements();
  }

  replaceLinks = () => {
    $('.reading a').each(function() {
      if($(this).attr('href').charAt(0) === '/'){
        var p = $('<a class="playgroundLink" href="'+$(this).attr('href')+'">'+$(this).text()+'</a>');
        p.click(window.clickLinkPlaygroundEvent);
        $(this).replaceWith(p);
      }
      else{
        var p = $('<a class="classicLink" href="'+$(this).attr('href')+'">'+$(this).text()+'</a>');
        $(this).replaceWith(p);
      }
    });
  }

  postSample = (datas) => {
    if(datas instanceof Array){
      // TODO faire des post atome par atome
    }else{
      callAPI(
        'POST',
        datas.adress,
        (data) => {
          this.props.dispatch(actions.setCurrentJson(data));
        },
        (xhr) => {
          this.props.setErrorMessage('Impossible to access this resource', xhr.status+' '+xhr.responseText);
        },
        {'Content-Type': 'application/json'},
        JSON.stringify(datas.datas)
      )
    }
  }

  replaceSampleElements = () => {
    var reactElement = this;
    //we parse the %{}%
    $('.reading p').each(function() {
      //we find the first occurence of % 
      var content = $(this).text();
      if(content.substring(0,2) === '%{' || content.substring(0,2) === '%['){
        content = JSON.parse(content.slice(1, -1));

        //we replace with a green link + icon, and make

        var p = $('<a class="sampleLink">'+content.label+'</a>');
        p.click(function(){ reactElement.postSample(content.post)});
        $(this).replaceWith(p);
      }
    });
  }

  createMarkup = () => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code){
        return window.hljs.highlightAuto(code).value;
      }
    });
    return {__html: marked(this.props.reading)};
  }

  initSample = () => {
    var urlCompute = '/categories/compute';
    var urlStorage = '/categories/storage';
    var urlStorageLink = '/categories/storagelink';

    //we need to send a string
    var jsonCompute = JSON.stringify(compute);
    var jsonStorage = JSON.stringify(storage);
    var jsonStorageLink = JSON.stringify(storagelink);

    this.postResource(urlCompute, jsonCompute);
    this.postResource(urlStorage, jsonStorage);
    this.postResource(urlStorageLink, jsonStorageLink);
  }

  postResource = (relativeUrl, json) => {
    callAPI(
      'POST',
      relativeUrl,
      (data) => {
        this.props.dispatch(actions.setCurrentQueryPath(relativeUrl));
        this.props.dispatch(actions.setReadableCode());
        this.props.dispatch(actions.setCurrentJson(data));
      },
      (xhr) => {
        this.props.dispatch(actions.setErrorMessage(''+xhr.responseText));
      },
      {'Content-Type': 'application/json'},
      json
    );
  }
  render() {
    return (
      <div>
        <div className="myCentering">
          {/*<button className="ui button" onClick={() => this.initSample()}>Init Sample</button> (work only if your server has occi-infra.xml !)*/}
        </div>
        <div className="reading segmentpadding" dangerouslySetInnerHTML={this.createMarkup()}></div>
      </div>
    );
  }
}

export default Reading = connect()(Reading);
