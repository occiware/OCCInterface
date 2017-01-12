import React from 'react';
import { connect } from 'react-redux';

import {callAPI} from '../../utils.js';
import * as actions from '../../actions/actionIndex.js';

class ActionButton extends React.Component{

  doAction = (actionDef) => {
    //we delete the messages
    this.props.setErrorMessage('', '');
    this.props.dispatch(actions.setOkMessage(''));

    console.log('doAction', actionDef);
    console.log('currentJson', this.props.currentJson);
    var resources = [];
    if (this.props.currentJson['kind']) {
      resources = [this.props.currentJson];
    } else if (this.props.currentJson[0] && this.props.currentJson[0]['kind']) {
      resources = this.props.currentJson;
    }

    var actionQuery = '?action=' + actionDef.term;
    var actionParams = {"action" : actionDef.scheme + actionDef.term};
    console.log('resources', resources, actionQuery, actionParams);

    for (var resourceInd in resources) {
      var resource = resources[resourceInd];
      // action location :
      // has to be ex. /compute/uuid per OCCI spec and for Mart
      var actionLocation = resource.location;
      if (!actionLocation.startsWith('/')) {
        actionLocation = '/' + actionLocation
      }
      var term = resource['kind'].split('#')[1];
      if (!actionLocation.startsWith('/' + term + '/')) {
        actionLocation = '/' + term + actionLocation;
      }
      callAPI(
        'POST',
        actionLocation + actionQuery,
        (data) => {
          this.props.dispatch(actions.setCurrentJson(data));
        },
        (xhr) => {
          this.props.dispatch(actions.setErrorMessage(''+xhr.responseText));
        },
        {'Content-Type': 'application/json'},
        JSON.stringify(actionParams)
      )
    }
  }

  render() {
    var actionDefs = [];
    var kindScheme = this.props.currentJson['kind'] || (this.props.currentJson[0] ? this.props.currentJson[0]['kind'] : null);
    if (kindScheme != null) {
      var schemeAndTerm = kindScheme.split('#');
      var schemeKindDefs = this.props.schemes[schemeAndTerm[0] + '#'];
      for (var i in schemeKindDefs) {
        if (schemeKindDefs[i]['term'] === schemeAndTerm[1]) {
          actionDefs = schemeKindDefs[i].actions;
          break;
        }
      }
      console.log('kind', kindScheme, schemeAndTerm, schemeKindDefs, actionDefs, this.props.schemes);
    }
    var actions = !actionDefs ? [] : actionDefs.map((actionDef, i) => {
      return <div className="item" key={actionDef.term} onClick={() => this.doAction(actionDef)}>
        <span className="text">{actionDef.term + (actionDef.title && actionDef.title.length != 0 ? ' - ' + actionDef.title : '')}</span>
      </div>
    });
    console.log('actions', actions);
    return (
      <a className="ui dropdown item orange button playgroundButton">
        ACT...
        {/* <i className="dropdown icon"></i> */}
        <div className="menu">
          {actions}
        </div>
      </a>
    );
  }
}

const mapStateToProps = (state) => ({
  currentJson: state.currentJson,
  currentPath: state.currentPath, // not used
  schemes: state.currentSchemes
})
export default ActionButton = connect(mapStateToProps)(ActionButton);
