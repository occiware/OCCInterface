import React from 'react';
import { connect } from 'react-redux';

import {callAPI, toRelativeUrl} from '../../utils.js';
import * as actions from '../../actions/actionIndex.js';
import CodeView from '../CodeView.js';
import { render } from 'react-dom';

// CDO
//import DoitButton from './DoitButton.js';


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
    console.log('resources', resources);
    console.log('actionQuery', actionQuery);
    console.log('actionParams', actionParams);

    // Ajout CodeVie
    var donnee=JSON.stringify(actionParams);
   

      console.log('-- donnee: ',donnee);

    for (var resourceInd in resources) {
      var resource = resources[resourceInd];
      // action location :
      // has to be ex. /compute/uuid per OCCI spec and for Mart

      console.log('resource location: ',resource.location);

      var relativeActionLocation = toRelativeUrl(resource.location);
      console.log('relativeActionLocation: ',relativeActionLocation);

      if (!relativeActionLocation.startsWith('/')) {
        relativeActionLocation = '/' + relativeActionLocation
      }
      var term = resource['kind'].split('#')[1];
      //if (!relativeActionLocation.startsWith('/' + term + '/')) {
      //  relativeActionLocation = '/' + term + relativeActionLocation;
      //}
      
      console.log('-- calling: ',relativeActionLocation + actionQuery);

      //callAPI(
       // 'POST',
        //relativeActionLocation + actionQuery,
        // (data) => {
        //   this.props.dispatch(actions.setCurrentJson(data));
        //  },
        //(xhr) => {
        //  this.props.dispatch(actions.setErrorMessage(''+xhr.responseText));
        //},
        //{'Content-Type': 'application/json'},
        //JSON.stringify(actionParams)
      //)
    }
  }

  updateCurrentJson = (e) => {
    this.props.dispatch(actions.setCurrentJson(e.target.value));
  }


  actiondoit = (actionDef) => {
    //document.getElementById("actbtn").innerHTML = 'DO IT';
    var actionQ = '?action=' + actionDef.term;
    var actionP = {"action" : actionDef.scheme + actionDef.term};
    var actionAttributes=actionDef.attributes;

    if (actionDef.attributes==={}) {
      actionP = {"action" : actionDef.scheme + actionDef.term};
    }
    else {
            var attribDef=JSON.stringify(actionAttributes, undefined, 2).replace(/\u2028/g, '\\u2028').replace('\n', '\\u2029');
            actionP = {"action" : actionDef.scheme + actionDef.term};
    }

    var resources = [];
    if (this.props.currentJson['kind']) {
      resources = [this.props.currentJson];
    } else if (this.props.currentJson[0] && this.props.currentJson[0]['kind']) {
      resources = this.props.currentJson;
    }

    if (resources[0]) {
      console.log('resource location: ',resources[0].location);
      var relativeActionLocation = toRelativeUrl(resources[0].location);
      console.log('relativeActionLocation: ',relativeActionLocation);

      this.props.dispatch(actions.setCurrentJson(actionP));
      this.props.dispatch(actions.setAction(relativeActionLocation + actionQ));

      /*
      var ourprops=this.props; 
      var ourthis=this;

      console.log('==== this ====', this);
      console.log('==== ourthis ====', ourthis);
      */
      /*var defaultonclick=document.getElementById("actbtn").onclick;    
      console.log('==== defaultonclick ====', defaultonclick);
   
      document.getElementById("actbtn").onclick = function () { doit(ourprops,ourthis,actionQ,actionP); };*/
      //ocument.getElementById( "a" ).setAttribute( "onClick", "javascript: Boo();" );

      console.log('actionQuery', actionQ);
      console.log('actionParams', actionP);
      console.log('actionAtributes', actionDef.attributes);
      //console.log('actionAtributes method', actionDef.attributes.method);
      console.log('-- props: ',this.props);
    }

  }

  doit = (actionQ) => {
    console.log('-- doit: ', actionQ);
    console.log('-- props: ',this.props);
  
    //we delete the messages
    
    this.props.setErrorMessage('', '');
    this.props.dispatch(actions.setOkMessage(''));

    console.log('-- calling URL: ',actionQ);
    console.log('-- calling Data: ',this.props.currentJson);

    var value;
    if (typeof this.props.currentJson === 'string' || this.props.currentJson instanceof String){
        value = this.props.currentJson;
    }
    else{
        value = JSON.stringify(this.props.currentJson,null,2);
      }


    callAPI(
      'POST',
      actionQ,
       (data) => {
         this.props.dispatch(actions.setCurrentJson(data));
        },
      (xhr) => {
        this.props.dispatch(actions.setErrorMessage(''+xhr.responseText));
      },
      {'Content-Type': 'application/json'},
      value
    )

    //document.getElementById("actbtn").innerHTML = 'ACT...';
    //document.getElementById("actbtn").onclick =function () {rebuild(myprops,mythis);};
    //mythis.setState(mythis.state);
    //mythis.forceUpdate();

    this.props.dispatch(actions.setReadableCode());
  }

  render() {
    var actionDefs = [];
    var kindScheme = this.props.currentJson['kind'] || (this.props.currentJson[0] ? this.props.currentJson[0]['kind'] : null);
    console.log('--- kindScheme ---',kindScheme);
    if (kindScheme != null) {
      var schemeAndTerm = kindScheme.split('#');
      console.log('--- schemeAndTerm ---',schemeAndTerm);
      var schemeKindDefs = this.props.schemes[schemeAndTerm[0] + '#'];
      console.log('--- schemeKindDefs ---',schemeKindDefs);
      for (var i in schemeKindDefs) {
        if (schemeKindDefs[i]['term'] === schemeAndTerm[1]) {
          actionDefs = schemeKindDefs[i].actions;
          break;
        }
      }
      console.log('kind', kindScheme, schemeAndTerm, schemeKindDefs, actionDefs, this.props.schemes);
    }
    var actions = !actionDefs ? [] : actionDefs.map((actionDef, i) => {
      return <div className="item" key={actionDef.term} onClick={() => this.actiondoit(actionDef)}>
        <span className="text">{actionDef.term + (actionDef.title && actionDef.title.length != 0 ? ' - ' + actionDef.title : '')}</span>
      </div>
    });
    console.log('actions', actions);
    
    
    
    var actionDoItMode = this.props.codeRights == 'action';
    return (
     <div>
     <div className="ui dropdown item orange button playgroundButton" id="act">
        ACT...
        {/* <i className="dropdown icon"></i> */}
        <div className="menu">
          {actions}
             </div>
       </div>
      {
        actionDoItMode ? <div className="ui dropdown item orange button playgroundButton" onClick={ () => this.doit(this.props.actionQ) } id="do">
        DO IT
      </div> : null
      }
     </div>
    );
  }
}


  
  var rebuild= function(myprops,mythis)  {
    var actionDefs = [];
    var kindScheme = mythis.props.currentJson['kind'] || (mythis.props.currentJson[0] ? mythis.props.currentJson[0]['kind'] : null);
    console.log('--- kindScheme ---',kindScheme);
    if (kindScheme != null) {
      var schemeAndTerm = kindScheme.split('#');
      console.log('--- schemeAndTerm ---',schemeAndTerm);
      var schemeKindDefs = mythis.props.schemes[schemeAndTerm[0] + '#'];
      console.log('--- schemeKindDefs ---',schemeKindDefs);
      for (var i in schemeKindDefs) {
        if (schemeKindDefs[i]['term'] === schemeAndTerm[1]) {
          actionDefs = schemeKindDefs[i].actions;
          break;
        }
      }
      console.log('CHDOR kind', kindScheme, schemeAndTerm, schemeKindDefs, actionDefs, myprops.schemes);
    }
    var actions = !actionDefs ? [] : actionDefs.map((actionDef, i) => {
      return <div className="item" key={actionDef.term} onClick={() => mythis.actiondoit(actionDef)}>
        <span className="text">{actionDef.term + (actionDef.title && actionDef.title.length != 0 ? ' - ' + actionDef.title : '')}</span>
      </div>
    });
    console.log('actions', actions);
    
    
    const element=(
     
        <div className="menu">
          {actions}>
             </div>
     
    );
    
    render(element, document.getElementsByClassName("row ui centered"));


    //mythis.forceUpdate();

    // return (
    //   <div className="ui dropdown item orange button playgroundButton" id="actbtn">
    //     ACT...
    //     { <i className="dropdown icon"></i> }
    //     <div className="menu">
    //       {actions}
    //          </div>
    //    </div>  
    // );


  }




const mapStateToProps = (state) => ({
  currentJson: state.currentJson,
  currentPath: state.currentPath, // not used
  schemes: state.currentSchemes,
  codeRights: state.codeRights,
  actionQ: state.actionQ
})
export default ActionButton = connect(mapStateToProps)(ActionButton);
