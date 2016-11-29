import React from 'react';


export default class ValueJSON  extends React.Component{
  isNumber = (obj) => {
      var typeTmp = Object.prototype.toString.call(obj).slice(8, -1);
      return typeTmp === 'Number';
  }


  clickLinkPlayground = (event) => {
    event.preventDefault();
    this.props.tools().clickLinkPlayground(event.target.href);
  }

  render(){
    var value;
    var valueDisplay;
    var isANumber = false;
    var isStr = false;
    var isBoolean = false;
    var element = this.props.value;

    if(element === false || element === true){
      value = <span className="boolean">{element.toString()}</span>;
      isBoolean = true;
    }
    else if(this.isNumber(element)){
      value = <span className="number">{element}</span>;
      isANumber = true;
    } else {
      var regexRoot = new RegExp(window.backendURL);
      isStr = true;
      //we make the link when finding a link of the playground
      if (regexRoot.test(element)){
        value = <a className="playgroundLink" href={element} onClick={this.clickLinkPlayground}>{element}</a>;
      } else {
        //we should need to make a value "bold" only in this case (a string)
        if(this.props.bold === true){
          value = <span className="string"><strong>{element}</strong></span>;
        } else {
          value = <span className="string">{element}</span>;
        }
      }
    }

    var whiteSpaces = '';
    for(var i=0; i<this.props.depth; i++){
      whiteSpaces += '  ';
    }


    var optionalComma = this.props.lastElement === true ? '' : ',';
    var doubleQuote = '"';
    
      if (isStr) {
          valueDisplay = <div className="inline">{whiteSpaces+doubleQuote}{value}{doubleQuote+optionalComma+'\n'}</div>;
      } else {
          valueDisplay = <div className="inline">{whiteSpaces}{value}{optionalComma+'\n'}</div>;
      }
    
    // valueDisplay = isBoolean ? <div className="inline">{whiteSpaces}{value}{optionalComma+'\n'}</div> :
    //   <div className="inline">{whiteSpaces+doubleQuote}{value}{doubleQuote+optionalComma+'\n'}</div>;

    return (
      <div className="inline">
        {valueDisplay}
      </div>
    );
  }
}
