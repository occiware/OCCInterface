import React from 'react';


export default class KeyValueJSON  extends React.Component{
  render(){
    var whiteSpaces = '';
    for(var i=0; i<this.props.depth; i++){
      whiteSpaces += '  ';
    }
    return (
      <div className="inline">
        {whiteSpaces}<span className="key">{'"'+this.props.myKey+'"'}</span> : {React.cloneElement(this.props.value, {firstElement: this.props.firstElement})}
      </div>
    );
  }
}
