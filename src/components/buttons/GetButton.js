import React from 'react';
import { connect } from 'react-redux';

import {callAPI} from '../../utils.js';
import * as actions from '../../actions/actionIndex.js';

class GetButton extends React.Component{
  getResource = () => {
    //we delete the error message
    this.props.setErrorMessage('', '');
    this.props.dispatch(actions.setReadableCode());

    callAPI(
      'GET',
      this.props.currentPath,
      (data) => {
        this.props.dispatch(actions.setCurrentJson(data));
      },
      (xhr) => {
        this.props.setErrorMessage('Impossible to access this resource',xhr.status+' '+xhr.responseText);
      }
    )
  }

  render() {
    return (
      <button className="ui green button playgroundButton" onClick={() => this.getResource()}>GET</button>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPath: state.currentPath
})
export default GetButton = connect(mapStateToProps)(GetButton);
