import React from 'react';
import { connect } from 'react-redux';

import {callAPI} from '../../utils.js';
import * as actions from '../../actions/actionIndex.js';

class DelButton extends React.Component{
  deleteData = () => {
    //we delete the error message
    this.props.setErrorMessage('', '');

    //we delete the ok message
    this.props.dispatch(actions.setOkMessage(''));
    
    var reactElement = this;

    $('.confirmationDelete').modal({
        onApprove: function() {
          callAPI(
            'DELETE',
            reactElement.props.currentPath,
            (data) => {
              reactElement.props.dispatch(actions.setCurrentQueryPath('/-/'));
              reactElement.props.dispatch(actions.setReadableCode());
              reactElement.props.dispatch(actions.setCurrentJson());
            },
            (xhr) => {
              reactElement.props.setErrorMessage('Impossible to delete this resource',xhr.status+' '+xhr.responseText);
            },
            {'Content-Type': 'application/json'}
          );
        }
    }).modal('show');
  }

  render() {
    return (
      <div>
        <button className="ui red button playgroundButton" onClick={this.deleteData}>DEL</button>

        <div className="ui basic modal confirmationDelete">
          <div className="description myCentering">
            <p>You are going to delete datas into the current server, are you sure?</p>
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

const mapStateToProps = (state) => ({
  currentPath: state.currentPath
})

export default DelButton = connect(mapStateToProps)(DelButton);
