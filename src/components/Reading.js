import React from 'react';
import { connect } from 'react-redux';

import marked from 'marked';

// import * as actions from '../actions/actionIndex.js';
import {compute, storage, storagelink} from '../../samples/occi-infra.js';

import {callAPI, sanitizeSampleLinks, addressToCategoriesUrl} from '../utils.js';
import * as actions from '../actions/actionIndex.js';
import {getRenderer} from '../createRendererMarked.js';

import ModalConfirmationPost from './ModalConfirmationPost.js';

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
      $(this).click((e) => {e.preventDefault();reactComponent.clickLinkSample($(this).attr('href'));});
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

  postSample = (content) => {
    var data, putOrPostMethod;
    if (content.put) {
      data = content.put;
      putOrPostMethod = 'PUT'
    } else {
      data = content.post;
      putOrPostMethod = 'POST'
    }
    if(!(data instanceof Array)){
      data = [ data ];
    }
    for(var datum of data){
      callAPI(
        putOrPostMethod,
        addressToCategoriesUrl(datum.address),
        (resData) => {
          this.props.dispatch(actions.setOkMessage('Data have been posted'));
        },
        (xhr) => {
          this.props.setErrorMessage('Unable to access this resource', xhr.status+' '+xhr.responseText);
        },
        {'Content-Type': 'application/json'},
        JSON.stringify(datum.data || datum.datas) // backwarc compatibility #16
      );
    }
  }

  deleteResources = (data) => {
    if(!(data instanceof Array)){
      data = [ data ];
    }
    for(var datum of data){
      callAPI(
        'DELETE',
        datum, // NB. NOT addressToCategoriesUrl(data) because can't delete a collection !
        (resData) => {
          this.props.dispatch(actions.setOkMessage('Resources have been deleted'));
        },
        (xhr) => {
          this.props.setErrorMessage('Unable to access this resource', xhr.status+' '+xhr.responseText);
        }
      );
    }
  }

  clickLinkSample = (uuid) => {
    this.props.goToTop();
    //we search into the current window.sampleDatas the correct json
    var content = '' ;
    for(var i=0; i<window.sampleDatas.length; i++){
      if(window.sampleDatas[i].uuid === uuid){
        content = window.sampleDatas[i];
        break;
      }
    }

    if(content !== ''){
      var reactElement = this;

      //before posting we ask for confirmation

      //we give data to the modal before it shows
      this.refs.ModalConfirmationPost.setState({'post': content.post, 'put': content.put, 'del': content.del});
      var modalConfirmationPost = this.refs.ModalConfirmationPost;

      //we show the modal
      $('.confirmationPost').modal({
          observeChanges: true,
          onApprove: function() {
            //a link can potentially post and del
            if('post' in content || 'put' in content){
              reactElement.postSample(content);
            }
            if('del' in content){
              reactElement.deleteResources(content.del);
            }
          },
          onHidden: function(){
            modalConfirmationPost.setState({seeDetails: false});
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

    return {__html: marked(sanitizeSampleLinks(this.props.reading))};
  }

  render() {
    return (
      <div>
        <div className="reading segmentpadding" dangerouslySetInnerHTML={this.createMarkup()}></div>

        <ModalConfirmationPost ref="ModalConfirmationPost" />
      </div>
    );
  }
}

export default Reading = connect()(Reading);
