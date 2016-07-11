import React from 'react';
import { connect } from 'react-redux';

var ReactMarkdown = require('react-markdown');
// import * as actions from '../actions/actionIndex.js';

export default class Reading extends React.Component{
  componentWillUpdate = (nextProps) => {
    //we make the animation only if we have a new reading
    if(nextProps.reading !== this.props.reading){
      $('.reading').transition('hide');
      $('.reading').transition('fade right');
    }
  }

  render() {
    // console.log(this.props.reading);
    return (
      <div className="row ui segment reading segmentpadding">
        <ReactMarkdown source={this.props.reading} />
      </div>
    );
  }
}
