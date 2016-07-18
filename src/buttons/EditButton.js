import React from 'react';
import { connect } from 'react-redux';

import {callAPI} from '../utils.js';
import * as actions from '../actions/actionIndex.js';

class EditButton extends React.Component{
  editButton = () => {
    var relativeUrl = this.props.currentPath;
    //we make a call in order to get the datas without the html formating
    callAPI(
      'GET',
      relativeUrl,
      (data) => {
        this.props.dispatch(actions.setCurrentQueryPath(relativeUrl));
        this.props.dispatch(actions.setCurrentJson(data));
        this.props.dispatch(actions.setEditableCode());
      },
      (xhr) => {
        this.props.dispatch(actions.setErrorMessage(''+xhr.responseText));
      }
    );
  }

  render() {
    if(this.props.codeRights === 'write'){
      var itemsPostPut = <div>
            <button className="ui yellow button" id="postButton" onClick={this.postButton}>POST</button>
            <button className="ui orange button" id="putButton" onClick={this.putButton}>PUT</button>
          </div>;
    }
    else{
      var itemEdit = <button className="ui orange button" onClick={this.editButton}>EDIT</button>;
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
