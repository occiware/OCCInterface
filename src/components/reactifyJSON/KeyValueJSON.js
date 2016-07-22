import React from 'react';


export default class KeyValueJSON  extends React.Component{
  render(){
    var whiteSpaces = '';
    for(var i=0; i<this.props.depth; i++){
      whiteSpaces += '  ';
    }
    return (
      <div className="inline">
        {whiteSpaces}<span className="key">{'"'+this.props.myKey+'"'}</span> : {this.props.value}
      </div>
    );
  }
}
