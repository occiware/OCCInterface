import React from 'react';
import { connect } from 'react-redux';

import marked from 'marked';

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

  componentDidUpdate = () => {
    //we transform all link of readings to make them playground-clickable
    this.replaceLinks();
  }

  componentDidMount = () => {
    this.replaceLinks();
  }

  replaceLinks = () => {
    $('.reading a').each(function() {
      if($(this).attr('href').charAt(0) === '/'){
        var p = $('<a href="'+$(this).attr('href')+'">'+$(this).text()+'</a>');
        p.click(window.clickLinkPlaygroundEvent);
        $(this).replaceWith(p);
      }
    });
  }

  createMarkup = () => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code){
        return window.hljs.highlightAuto(code).value;
      }
    });
    return {__html: marked(this.props.reading)};
  }

  render() {
    return (
      <div className="reading segmentpadding" dangerouslySetInnerHTML={this.createMarkup()}>
      </div>
    );
  }
}
