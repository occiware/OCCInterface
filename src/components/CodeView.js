import React from 'react';
import { connect } from 'react-redux';


class CodeView extends React.Component{
  createMarkup = () => {
    return {__html: this.props.currentJson}
  }

  render() {

    // var view = <pre className="segmentpadding mydata" dangerouslySetInnerHTML={this.createMarkup()}></pre>;
    var view = <pre className="segmentpadding mydata">{JSON.stringify(this.props.currentJson,null,2)}</pre>;

    return(
      <div className="row ui segment mydatacontainer">
        {view}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentJson: state.currentJson
})

export default CodeView = connect(mapStateToProps)(CodeView);
