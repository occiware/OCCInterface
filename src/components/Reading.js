import React from 'react';
import { connect } from 'react-redux';

import ReactMarkdown from 'react-markdown';
import CodeBlock from '../code-block.js';
// import * as actions from '../actions/actionIndex.js';

export default class Reading extends React.Component{
  componentWillUpdate = (nextProps) => {
    //we make the animation only if we have a new reading
    if(nextProps.reading !== this.props.reading){
      $('.reading').transition('hide');
      $('.reading').transition('fade');
    }
  }

  poc = () => {
    console.log('bla');
  }
  
  render() {
    // console.log(this.props.reading);
    return (
      <div className="row ui reading segmentpadding">
        <ReactMarkdown source={this.props.reading} renderers={Object.assign({}, ReactMarkdown.renderers, {
                            CodeBlock: CodeBlock })}/>
      </div>
    );
  }
}
