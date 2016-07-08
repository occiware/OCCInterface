import React from 'react';
import { connect } from 'react-redux';


class CodeView extends React.Component{
  createMarkup = () => {
    return {__html: this.props.currentJson}
  }
  updateCurrentJson = (e) => {
    this.props.dispatch(actions.setEditable(e.target.value));
  }

  render() {

    var view = <pre className="segmentpadding mydata" dangerouslySetInnerHTML={this.createMarkup()}></pre>;

    return(
      <div className="row ui segment mydatacontainer">
        {view}
      </div>
    );
  }
}

export default CodeView = connect()(CodeView);
