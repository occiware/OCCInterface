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

    this.replaceLinkSample();
    this.replaceLinks();
  }

  componentWillMount = () => {
    $('.confirmationPost')
      .modal('hide')
    ;
  }

  componentDidMount = () => {
    //this order is very important !
    this.replaceLinkSample();
    this.replaceLinks();
  }

  replaceLinks = () => {
    var reactComponent = this;
    $('.reading a').each(function() {
      if($(this).attr('href').charAt(0) === '/'){
        var p = $('<a class="playgroundLink" href="'+$(this).attr('href')+'">'+$(this).text()+'</a>');
        p.click(reactComponent.props.clickLinkPlaygroundEvent);
        $(this).replaceWith(p);
      }
      else{
        //we do not touch it if it is a sample link
        if($(this).attr('class') !== 'sampleLink'){
          var p = $('<a class="classicLink" href="'+$(this).attr('href')+'">'+$(this).text()+'</a>');
          $(this).replaceWith(p);
        }
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

  deleteResources = (datas) => {
    if(datas instanceof Array){
      for(var data of datas){
        callAPI(
          'DELETE',
          data,
          null,
          (xhr) => {
            this.props.setErrorMessage('Impossible to access this resource', xhr.status+' '+xhr.responseText);
          }
        );
      }
    }else{
      callAPI(
        'DELETE',
        datas,
        (data) => {
          this.props.dispatch(actions.setCurrentJson(''));
        },
        (xhr) => {
          this.props.setErrorMessage('Impossible to access this resource', xhr.status+' '+xhr.responseText);
        }
      );
    }
  }


  replaceLinkSample = () => {
    var reactElement = this;
    var approve = false;

    //we parse the %{}%
    $('.reading p').each(function() {
      var cache = reactElement.replaceLinkSampleParagraph($(this).html());
      var parsedText = cache.element;

      //we keep formating until there is no %{}% in the current text
      while(cache.finish !== true){
        parsedText = cache.element;
        cache = reactElement.replaceLinkSampleParagraph(parsedText.html());
      }
      $(this).replaceWith(parsedText);
    });
  }

  //replace the first ocurence of %{}% in a paragraph
  replaceLinkSampleParagraph = (fullText) => {
    var beforeString = '';
    var afterString = '';

    var fillBefore = true;
    var fillAfter = false;

    var indexBeginContent = 0;

    var content = '';

    for(var i=0; i<fullText.length; i++){
      if(i !== fullText.length-1){
        if(fullText[i] === '%' && (fullText[i+1] === '{' || fullText[i+1] === '[')){
          indexBeginContent = i;
          fillBefore = false;
        }
        if((fullText[i] === '}' || fullText[i] === ']') && fullText[i+1] === '%'){
          content = fullText.slice(indexBeginContent,i+2);
          fillAfter = true;
        }
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
      var reactElement = this;

      link.click(function(event){ event.preventDefault(); reactElement.clickLinkSample(content);});

      //we convert our string to a jquery object
      p.append($.parseHTML(beforeString));
      p.append(link);
      p.append(' <i class="upload icon"></i>');
      p.append($.parseHTML(afterString));

      return {element: p, finish: false};
    }
    else{
      var p = $('<p></p>');
      p.append($.parseHTML(beforeString));
      return {element: p, finish: true};
    }
  }

  clickLinkSample = (content) => {
    var reactElement = this;
    //before posting we ask for confirmation
    $('.confirmationPost').modal({
        onApprove: function() {
          if('post' in content){
            reactElement.postSample(content.post);
          }
          if('del' in content){
            reactElement.deleteResources(content.del);
          }
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
            <div className="description myCentering">
              <p>You are going to create or delete datas into the current server, are you sure?</p>
            </div>

          <div className="actions">
              <div className="ui ok green basic right inverted button">
                <i className="checkmark icon"></i>
                Yes
              </div>
              <div className="ui cancel red basic right inverted button">
                <i className="remove icon"></i>
                No
              </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Reading = connect()(Reading);
