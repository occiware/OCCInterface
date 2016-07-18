import React from 'react';
import { connect } from 'react-redux';

import {callAPI} from '../utils.js';
import * as actions from '../actions/actionIndex.js';

class GetButton extends React.Component{
  getResource = () => {
    callAPI(
      'GET',
      this.props.currentPath,
      (data) => {
        this.props.dispatch(actions.setCurrentJson(data));
      }
    )
    // rajouter onError
  }
  render() {
    return (
      <button className="ui green button" onClick={() => this.getResource()}>GET</button>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPath: state.currentPath
})
export default GetButton = connect(mapStateToProps)(GetButton);
