import React from 'react';


export default class TableauJSON  extends React.Component{
  render(){
    var whiteSpaces = '';
    for(var i=0; i<this.props.depth; i++){
      whiteSpaces += '  ';
    }
    var optionalWhiteSpace = this.props.firstElement === true ? '' : whiteSpaces;

    return (
      <div className="inline">
      {optionalWhiteSpace}{'[ \n'}
      {this.props.elements}
      {whiteSpaces}{'] \n'}
      </div>
    );
  }
}
