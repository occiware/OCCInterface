import React from 'react';
import { connect } from 'react-redux';

export default class NavBar extends React.Component{
  componentDidMount = () => {
    $('.ui.dropdown').dropdown();
  }

  render() {
    return (
      <div className="ui inverted menu navbar centered grid darkred">
        <a className="brand item largefont">Ozwillo Datacore</a>
        <a href="/dc-ui" className="item largefont">Play</a>
        <a href="/dc-ui/import/index.html" className="item largefont">Import</a>
        <a className="ui dropdown item">
          <i className="dropdown icon"></i>
          <div className="menu">
          </div>
        </a>
      </div>
    );
  }
}
