import React from 'react';


export default class KeyValueJSON  extends React.Component{
  render(){
    var whiteSpaces = '';
    for(var i=0; i<this.props.depth; i++){
      whiteSpaces += '  ';
    }

    //in order to make the kind more visible
    if (this.props.myKey === 'kind'){
      var key = <strong>{'"'+this.props.myKey+'"'}</strong>;
      var bold = true;
    }
    else{
      var key = '"'+this.props.myKey+'"';
      var bold = false;
    }
    return (
      <div className="inline">
        {whiteSpaces}<span className="key">{key}</span> : {React.cloneElement(this.props.value, {firstElement: this.props.firstElement,
           lastElement: this.props.lastElement, bold: bold})}
      </div>
    );
  }
}
