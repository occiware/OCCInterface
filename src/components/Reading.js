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
    this.replaceSampleElements();
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
      for(var data of datas){
        callAPI(
          'POST',
          data.adress,
          null,
          (xhr) => {
            this.props.setErrorMessage('Impossible to access this resource', xhr.status+' '+xhr.responseText);
          },
          {'Content-Type': 'application/json'},
          JSON.stringify(data.datas)
        );
      }
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
      );
    }
  }

  replaceSampleElements = () => {
    var reactElement = this;
    //we parse the %{}%
    $('.reading p').each(function() {
      //we extract %{ or %[

      var beforeString = '';
      var afterString = '';

      var fillBefore = true;
      var fillAfter = false;

      var fullText = $(this).text();

      var indexBeginContent = 0;

      var content = '';

      for(var i=0; i<fullText.length-2; i++){
        if(fullText[i] === '%' && (fullText[i+1] === '{' || fullText[i+1] === '[')){
          indexBeginContent = i;
          fillBefore = false;
        }
        if((fullText[i] === '}' || fullText[i] === ']') && fullText[i+1] === '%'){
          content = fullText.slice(indexBeginContent,i+2);
          fillAfter = true;
        }

        if(fillBefore){
          beforeString += fullText[i];
        }
        if(fillAfter){
          afterString += fullText[i];
        }
      }

      //we replace only if there is a % into the current <p>
      if(content !== ''){
        afterString = afterString.slice(2);

        content = JSON.parse(content.slice(1, -1));

        //we replace with a green link + icon

        var link = $('<a class="sampleLink" href="">'+content.label+'</a>');
        var p = $('<p></p>');
        // var before = $('<span>'+ beforeString +' </span>');
        // var after = $('<span> '+ afterString +'</span>');

        link.click(function(event){ event.preventDefault(); reactElement.postSample(content.post);});
        p.append(beforeString);
        p.append(link);
        p.append(afterString);

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
