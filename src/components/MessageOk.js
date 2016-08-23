import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actionIndex.js';

class MessageOk extends React.Component{
  componentDidMount = () => {
    var component = this;
    $('.okMessage .close')
    .on('click', function() {
      $(this)
        .closest('.okMessage')
        .transition('fade')
      ;
      //we delete the current message into the store
      component.props.dispatch(actions.setOkMessage(''));
    });
    // $('.errorPath').transition('fade');
  }

  render() {
    return(
      <div className="ui icon positive message okMessage">
      <i className="close icon"></i>
      <i className="warning circle icon" ></i>
      <p>
        {this.props.message}
      </p>
      </div>
    );
  }
}

export default MessageOk = connect()(MessageOk);
