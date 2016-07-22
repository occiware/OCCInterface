import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actionIndex.js';
import {toolify} from '../utils.js';

class CodeView extends React.Component{
  createMarkup = (json) => {
    return {__html: json}
  }

  fullscreen = () => {
    $('#dataContainerModal').modal({
      selector: {
        close: '.close, .actions .button.close.icon, .closeIcon'
      },
      //to prevent semantic ui from moving the element to the end of the page
      detachable: false
    });
    $('#dataContainerModal').modal('show');
  }

  //double data binding with the model
  updateCurrentJson = (e) => {
    this.props.dispatch(actions.setCurrentJson(JSON.parse(e.target.value)));
  }

  linkClicked = () => {
    console.log('click"');
  }

  render() {
    if(this.props.codeRights === 'write'){
      var view = <textarea className="segmentpadding mydata textareamydata" onChange={this.updateCurrentJson} value={JSON.stringify(this.props.currentJson,null,2)}></textarea>;
    }
    else{
      if(typeof this.props.currentJson !== 'undefined'){
        var json = toolify(this.props.currentJson, this.props.tools);
      }
      else{
        var json = '';
      }
      var view = <pre className="segmentpadding mydata">{json}</pre>;
    }

    return(
      <div className="row ui segment mydatacontainer">
        <div className="ui right floated myExpand" onClick={this.fullscreen}>
          <i className="expand disabled link icon"></i>
        </div>
        {view}

        <div className="ui fullscreen modal" id="dataContainerModal">
          <div className="ui right floated myExpand closeIcon">
            <i className="close disabled link icon"></i>
          </div>
          {view}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentJson: state.currentJson,
  codeRights: state.codeRights
})

export default CodeView = connect(mapStateToProps)(CodeView);
