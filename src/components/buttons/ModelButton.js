import React from 'react';
import { connect } from 'react-redux';

import {callAPI, isErocciBackendCategoriesPrefix} from '../../utils.js';
import * as actions from '../../actions/actionIndex.js';

//deactivate when not on a resource?
class ModelButton extends React.Component{

  getModel = () => {
    //we delete the error message
    this.props.setErrorMessage('', '');
    //we delete the ok message
    this.props.dispatch(actions.setOkMessage(''));

    //first we get the kind of the requested resource
    var currentKind = '';
    callAPI(
      'GET',
      this.props.currentPath,
      (data) => {
        var copy = false;
        //is there is no kind (for instance with /-/), we can't access the model
        if(data.kind !== undefined){
          for(var i=0;i<data.kind.length;i++){
            if(copy){
              currentKind += data.kind[i];
            }
            if(data.kind[i] === '#'){
              copy = true;
            }
          }
        }
        //if it is not the query interface, we may have a /categories/{categorie} IF conf'd for erocci
        else if(this.props.currentPath !== '/-/'){
          var regex = isErocciBackendCategoriesPrefix() ?
              /\/categories\/(.*)/ : /\/(.*)/;
          var matchRegex = regex.exec(this.props.currentPath);

          if(matchRegex !== null){
            currentKind = matchRegex[1];
          }
          else{
            this.props.setErrorMessage('Impossible to go to the model of this resource');
          }
        }
        else{
          this.props.setErrorMessage('Impossible to go to the model of this resource');
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
