import React from 'react';
import { connect } from 'react-redux';


class CodeView extends React.Component{
  createMarkup = () => {
    return {__html: this.props.currentJson}
  }

  render() {
    console.log(this.props.codeRights);
    if(this.props.codeRights === 'write'){
      var view = <textarea className="segmentpadding mydata textareamydata" onChange={this.updateCurrentJson} defaultValue={JSON.stringify(this.props.currentJson,null,2)}></textarea>;
    }
    else{
      var view = <pre className="segmentpadding mydata">{JSON.stringify(this.props.currentJson,null,2)}</pre>;
      // var view = <pre className="segmentpadding mydata" dangerouslySetInnerHTML={this.createMarkup()}></pre>;
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
