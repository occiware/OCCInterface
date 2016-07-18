import React from 'react';
import { connect } from 'react-redux';

import {syntaxHighlight} from '../utils.js';

class CodeView extends React.Component{
  createMarkup = (json) => {
    return {__html: json}
  }

  render() {


    if(typeof this.props.currentJson !== 'undefined'){
      var json = syntaxHighlight(JSON.stringify(this.props.currentJson,null,2));
      console.log('passe');
    }
    else{
      var json = '';
    }


    if(this.props.codeRights === 'write'){
      var view = <textarea className="segmentpadding mydata textareamydata" onChange={this.updateCurrentJson} defaultValue={JSON.stringify(this.props.currentJson,null,2)}></textarea>;
    }
    else{
      //var view = <pre className="segmentpadding mydata">{json}</pre>;

      var view = <pre className="segmentpadding mydata" dangerouslySetInnerHTML={this.createMarkup(json)}></pre>;
    }

    return(
      <div className="row ui segment mydatacontainer">
        {view}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentJson: state.currentJson,
  codeRights: state.codeRights
})

export default CodeView = connect(mapStateToProps)(CodeView);
