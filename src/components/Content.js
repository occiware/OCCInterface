import React from 'react';
import { connect } from 'react-redux';

import CodeView from './CodeView.js';
import MessageErrorPath from './MessageErrorPath.js';
import InputCurrentPath from './InputCurrentPath.js';
import Reading from './Reading.js';

import GetButton from './buttons/GetButton.js';
import EditButton from './buttons/EditButton.js';
import DelButton from './buttons/DelButton.js';

import {callAPI} from '../utils.js';
import * as actions from '../actions/actionIndex.js';

class Content extends React.Component{
  preventClickEffect = () => {
    $('.dclink').click((e) => {
      e.preventDefault();
    });
    $('.playground').click((e) => {
      e.preventDefault();
    });
  }

  componentDidUpdate = () => {
    this.preventClickEffect();
  }

  clickLinkPlayground = (link) => {
    //we remove the rootURL of the link
    link = link.replace(window.backendURL, '');

    this.props.dispatch(actions.setCurrentQueryPath(link));

    this.props.dispatch(actions.setReadableCode());
    callAPI(
      'GET',
      link,
      (data) => {
        this.props.dispatch(actions.setCurrentJson(data));
      }
    )
    // rajouter onError
  }

  setErrorMessage = (simple, detailed) => {
    this.props.dispatch(actions.setErrorMessage(simple,detailed));
  }

  tools = () => {
    return {
      clickLinkPlayground: this.clickLinkPlayground
    }
  }

  render() {
    var errorMessage = this.props.errorMessage.simple ? <MessageErrorPath message={this.props.errorMessage.simple}
                        messageErrorDetails={this.props.errorMessage.detailed}/> : null;
    return (
      <div className="twelve wide column ui grid">
        <div className="row">
          <h2 className="ui header">
            <i className="configure icon"></i>
            <div className="content">
              OCCI playground
            </div>
          </h2>
        </div>
        <div className="ui grid main">
          <div className="row ui form">
            <div className="field adresseget">
              <div className="ui label pointing below">
                <p>OCCI server</p>
              </div>
              <InputCurrentPath />
            </div>
          </div>
          <div className="row ui centered">
            <GetButton setErrorMessage={this.setErrorMessage} />
            <EditButton setErrorMessage={this.setErrorMessage}/>
            <DelButton setErrorMessage={this.setErrorMessage}/>
          </div>

          {errorMessage}
          <CodeView tools={this.tools}/>

          <Reading reading={this.props.reading} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.errorMessage
})

export default Content = connect(mapStateToProps)(Content);
