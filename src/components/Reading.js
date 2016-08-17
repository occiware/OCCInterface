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
    this.replaceLinkSample();
  }

  componentWillMount = () => {
    $('.confirmationPost')
      .modal('hide')
    ;
  }

  componentDidMount = () => {
    this.replaceLinks();
    this.replaceLinkSample();
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

  replaceLinkSample = () => {
    var reactElement = this;
    var approve = false;

    //we first ask for confirmation

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

        link.click(function(event){ event.preventDefault(); reactElement.clickLinkSample(content);});
        p.append(beforeString);
        p.append(link);
        p.append('<i class="disk outline icon"></i>');
        p.append(afterString);

        $(this).replaceWith(p);
      }
    });
  }

  clickLinkSample = (content) => {
    var reactElement = this;
    //before posting we ask for confirmation
    $('.confirmationPost').modal({
        onApprove: function() {
          reactElement.postSample(content.post);
        }
    }).modal('show');
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

  render() {
    return (
      <div>
        <div className="reading segmentpadding" dangerouslySetInnerHTML={this.createMarkup()}></div>

        <div className="ui basic modal confirmationPost">
          <i className="close icon"></i>
          <div className="image content">
            <div className="description">
              <p>You are going to post datas into the current server, are you sure?</p>
            </div>
          </div>
          <div className="actions">
            <div className="two fluid ui inverted buttons">
              <div className="ui ok green basic inverted button">
                <i className="checkmark icon"></i>
                Yes
              </div>
              <div className="ui cancel red basic inverted button">
                <i className="remove icon"></i>
                No
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reading = connect()(Reading);
