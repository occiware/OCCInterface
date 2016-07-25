import React from 'react';
import { connect } from 'react-redux';

import {callAPI} from '../../utils.js';
import * as actions from '../../actions/actionIndex.js';

class DelButton extends React.Component{
  deleteData = () => {
    callAPI(
      'DELETE',
      this.props.currentPath,
      (data) => {
        this.props.dispatch(actions.setCurrentQueryPath('/-/'));
        this.props.dispatch(actions.setReadableCode());
        this.props.dispatch(actions.setCurrentJson());
      },
      (xhr) => {
        this.props.dispatch(actions.setErrorMessage(''+xhr.responseText));
      },
      {'Content-Type': 'application/json'}
    );
  }

  render() {
    return (
      <button className="ui red button" onClick={this.deleteData}>DEL</button>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPath: state.currentPath
})

export default DelButton = connect(mapStateToProps)(DelButton);
