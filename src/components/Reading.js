import React from 'react';
import { connect } from 'react-redux';

import marked from 'marked';

// import * as actions from '../actions/actionIndex.js';
import {compute, storage, storagelink} from '../../samples/occi-infra.js';

import {callAPI} from '../utils.js';
import * as actions from '../actions/actionIndex.js';
import {getRenderer} from '../createRendererMarked.js';

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

  replaceLinkSample = () => {
    var reactComponent = this;
    $('.sampleLink').each(function() {
      $(this).click((e) => {e.preventDefault();reactComponent.clickLinkSample($(this).text());});
    });
  }

  //replace the playgrounLink
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


  clickLinkSample = (label) => {
    //we search into the current window.sampleDatas the correct json
    var content = '' ;
    for(var i=0; i<window.sampleDatas.length; i++){
      if(window.sampleDatas[i].label === label){
        content = window.sampleDatas[i];
        break;
      }
    }

    if(content !== ''){
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
    else{
      this.props.setErrorMessage('Error posting resource', '');
    }
  }

  createMarkup = () => {
    marked.setOptions({
      renderer: getRenderer(),
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
