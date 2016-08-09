import React from 'react';
import { connect } from 'react-redux';

import marked from 'marked';

// import * as actions from '../actions/actionIndex.js';
import {compute} from '../../samples/occi-infra.js';

import {callAPI} from '../utils.js';

export default class Reading extends React.Component{
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
    var relativeUrl = '/categories/compute';

    //we need to send a string
    var json = JSON.stringify(compute);

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
        {/*<button className="ui button" onClick={() => this.initSample()}>Init Sample</button>*/}
        <div className="reading segmentpadding" dangerouslySetInnerHTML={this.createMarkup()}></div>
      </div>
    );
  }
}
