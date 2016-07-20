import React from 'react';
import { connect } from 'react-redux';

import {toolify} from '../utils.js';

class CodeView extends React.Component{
  createMarkup = (json) => {
    return {__html: json}
  }

  fullscreen = () => {
    //to prevent semantic ui from moving the element to the end of the page
    $('#dataContainerModal').modal({
      detachable: false
    });
    $('#dataContainerModal').modal('show');
  }

  render() {
    if(typeof this.props.currentJson !== 'undefined'){
      var json = toolify(this.props.currentJson);
    }
    else{
      var json = '';
    }

    if(this.props.codeRights === 'write'){
      var view = <textarea className="segmentpadding mydata textareamydata" onChange={this.updateCurrentJson} defaultValue={JSON.stringify(this.props.currentJson,null,2)}></textarea>;
    }
    else{
      var view = <pre className="segmentpadding mydata" dangerouslySetInnerHTML={this.createMarkup(json)}></pre>;
    }

    return(
      <div className="row ui clearing segment mydatacontainer">
        <div className="ui right floated myExpand" onClick={this.fullscreen}>
          <i className="expand disabled link icon"></i>
        </div>
        {view}

        <div className="ui fullscreen modal" id="dataContainerModal">
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
