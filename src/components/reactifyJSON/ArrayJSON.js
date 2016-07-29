import React from 'react';


export default class ArrayJSON  extends React.Component{
  constructor(props){
    super(props);
    this.state = {show: true};
  }

  render(){
    var whiteSpaces = '';
    for(var i=0; i<this.props.depth; i++){
      whiteSpaces += '  ';
    }
    var optionalWhiteSpace = this.props.firstElement === true ? '' : whiteSpaces;
    var optionalComma = this.props.lastElement === true ? '' : ',';

    var iconShow = <i className="plus square outline icon link" onClick={() => {this.setState({show: true})}}></i>;
    var iconHide = <i className="minus square outline icon link" onClick={() => {this.setState({show: false})}}></i>;

    var icon = this.state.show ? iconHide : iconShow;

    var displayChildren = this.state.show ? this.props.elements : null;
    return (
      <div className="inline">
      {optionalWhiteSpace}{'[ '}{icon}{' \n'}
      {displayChildren}
      {whiteSpaces}{']'}{optionalComma}{'\n'}
      </div>
    );
  }
}
