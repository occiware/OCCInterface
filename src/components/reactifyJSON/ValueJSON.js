import React from 'react';


export default class ValueJSON  extends React.Component{
  isNumber = (obj) => { return !isNaN(parseFloat(obj)) }


  clickLinkPlayground = (event) => {
    event.preventDefault();
    this.props.tools().clickLinkPlayground(event.target.href);
  }

  render(){
    var value;
    var element = this.props.value;

    if(element === false || element === true){
      value = <span className="boolean">{element.toString()}</span>;
      var boolean = true;
    }
    else if(this.isNumber(element)){
      value = <span className="number">{element}</span>;
    }
    else{
      var regexRoot = new RegExp(window.backendURL);

      //we make the link when finding a link of the playground
      if (regexRoot.test(element)){
        value = <a className="playgroundLink" href={element} onClick={this.clickLinkPlayground}>{element}</a>;
      }
      else{
        //we should need to make a value "bold" only in this case (a string)
        if(this.props.bold === true){
          value = <span className="string"><strong>{element}</strong></span>;
        }
        else{
          value = <span className="string">{element}</span>;
        }
      }
    }

    var whiteSpaces = '';
    for(var i=0; i<this.props.depth; i++){
      whiteSpaces += '  ';
    }


    var optionalComma = this.props.lastElement === true ? '' : ',';

    if(boolean){
      console.log(value);
    }

    var valueDisplay = boolean ? <div className="inline">{whiteSpaces}{value}{optionalComma+'\n'}</div> :
      <div className="inline">{whiteSpaces+'"'}{value}{'"'+optionalComma+'\n'}</div>;

    return (
      <div className="inline">
        {valueDisplay}
      </div>
    );
  }
}
