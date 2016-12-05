import React from 'react';
import { connect } from 'react-redux';

import {callAPI} from '../../utils.js';
import * as actions from '../../actions/actionIndex.js';

class EditButton extends React.Component{
  editButton = () => {
    //we delete the error message
    this.props.setErrorMessage('', '');

    //we delete the ok message
    this.props.dispatch(actions.setOkMessage(''));
    
    var relativeUrl = this.props.currentPath;
    //we make a call in order to get the data without the html formating
    callAPI(
      'GET',
      relativeUrl,
      (data) => {
        this.props.dispatch(actions.setCurrentQueryPath(relativeUrl));
        this.props.dispatch(actions.setEditableCode());
        this.props.dispatch(actions.setCurrentJson(data));
      },
      (xhr) => {
        this.props.setErrorMessage('Impossible to edit this resource',xhr.status+' '+xhr.responseText);
      }
    );
  }

  postButton = () => {
    this.editData('POST');
  }

  putButton = () => {
    this.editData('PUT');
  }

  editData = (operationType) => {
    var relativeUrl = this.props.currentPath;

    //we need to send a string
    var json = (typeof this.props.currentJson === 'string' || this.props.currentJson instanceof String) ? this.props.currentJson : JSON.stringify(this.props.currentJson);

    callAPI(
      operationType,
      relativeUrl,
      (data) => {
        this.props.dispatch(actions.setCurrentQueryPath(relativeUrl));
        this.props.dispatch(actions.setReadableCode());
        this.props.dispatch(actions.setCurrentJson(data));
      },
      (xhr) => {
        this.props.dispatch(actions.setErrorMessage(''+xhr.responseText));
      },
      {'Content-Type': 'application/json'},
      json
    );
  }

  render() {
    if(this.props.codeRights === 'write'){
      var itemsPostPut = <div>
            <button className="ui yellow button playgroundButton" id="postButton" onClick={this.postButton}>POST</button>
            <button className="ui orange button playgroundButton" id="putButton" onClick={this.putButton}>PUT</button>
          </div>;
    }
    else{
      var itemEdit = <button className="ui orange button playgroundButton" onClick={this.editButton}>EDIT</button>;
    }
    return (
      <div>
          {itemEdit}
          {itemsPostPut}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentJson: state.currentJson,
  currentPath: state.currentPath,
  codeRights: state.codeRights
})
export default EditButton = connect(mapStateToProps)(EditButton);
