import React from 'react';


export default class ValueJSON  extends React.Component{
  isNumber = (obj) => { return !isNaN(parseFloat(obj)) }

  render(){
    var value;
    var element = this.props.value;
    if(element === false || element === true){
      value = <span className="boolean">{element}</span>;
    }
    else if(this.isNumber(element)){
      value = <span className="number">{element}</span>;
    }
    else{
      value = <span className="string">{element}</span>;
    }

    var whiteSpaces = '';
    for(var i=0; i<this.props.depth; i++){
      whiteSpaces += '  ';
    }

    var optionalComma = this.props.lastElement === true ? '' : ',';
    return (
      <div className="inline">{whiteSpaces+'"'}{value}{'"'+optionalComma+'\n'}</div>
    );
  }
}
