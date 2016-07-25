import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actionIndex.js';

class MessageErrorPath extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      seeDetails: false
    };
  }

  componentDidMount = () => {
    var component = this;
    $('.message .close')
    .on('click', function() {
      $(this)
        .closest('.errorPath')
        .transition('fade')
      ;
      //we delete the current message into the store
      component.props.dispatch(actions.setErrorMessage('',''));
    });
    // $('.errorPath').transition('fade');
  }

  render() {
    if(this.props.messageErrorDetails != undefined){
      var moreDetails = <a onClick={() => {this.setState({seeDetails: true})}}>More details</a>;
    }

    if(this.state.seeDetails === false){
      var message = <span>
          {this.props.message}
          <br/>
          {moreDetails}
        </span>;
    }
    else{
      var message = this.props.messageErrorDetails;
    }

    return(
      <div className="ui icon error message errorPath">
      <i className="close icon"></i>
      <i className="warning circle icon" ></i>
      <p>
        {message}
      </p>
      </div>
    );
  }
}

export default MessageErrorPath = connect()(MessageErrorPath);
