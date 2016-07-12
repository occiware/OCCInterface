import React from 'react';
import { connect } from 'react-redux';

export default class GetButton extends React.Component{
  render() {
    // console.log(this.props.reading);
    return (
      <button className="ui green button">GET</button>
    );
  }
}
