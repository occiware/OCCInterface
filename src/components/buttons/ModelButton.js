import React from 'react';
import { connect } from 'react-redux';

import {callAPI} from '../../utils.js';
import * as actions from '../../actions/actionIndex.js';

//deactivate when not on a resource?
class ModelButton extends React.Component{

  getModel = () => {
    //first we get the kind of the requested resource
    var currentKind = '';

    callAPI(
      'GET',
      this.props.currentPath,
      (data) => {
        var copy = false;
        for(var i=0;i<data.kind.length;i++){
          if(copy){
            currentKind += data.kind[i];
          }
          if(data.kind[i] === '#'){
            copy = true;
          }
        }
      },
      (xhr) => {
        this.props.setErrorMessage('Impossible to go to the model', xhr.status+' '+xhr.responseText);
      },
      {'Content-Type': 'application/json'},
      null,
      false
    );

    callAPI(
      'GET',
      '/-/',
      (data) => {
        var kinds = data.kinds;
        var model;
        for(var i=0; i<kinds.length; i++){
          console.log(currentKind+' '+kinds[i].term);
          if(kinds[i].term === currentKind){
            model = kinds[i];
          }
        }

        this.props.dispatch(actions.setCurrentQueryPath('/-/'));
        this.props.dispatch(actions.setReadableCode());
        this.props.dispatch(actions.setCurrentJson(model));
      },
      (xhr) => {
        this.props.setErrorMessage('Impossible to go to the model', xhr.status+' '+xhr.responseText);
      },
      {'Content-Type': 'application/json'}
    );
  }

  render() {
    return (
      <button className="ui blue button playgroundButton" onClick={this.getModel}>M</button>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPath: state.currentPath
})

export default ModelButton = connect(mapStateToProps)(ModelButton);
