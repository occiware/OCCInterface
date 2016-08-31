import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';


export default class Menu  extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      hidden: false,
      onButton: false
    }; 
  }

  render(){
    return (
      <div className="ui four wide column centered grid">
        <div className="ui center sticky groupementmenu">
          <div className="ui center column menubutton center aligned container">
            <MenuDepliant readings={this.props.readings}/>
          </div>
        </div>
      </div>
    );
  }
}

class MenuDepliant extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.readings[0].path
    };

  }

  setActive = (element) => {
    this.setState({active: element});
  }

  render(){
    return(
      <div className="ui myCentering secondary vertical pointing menu mymenu">
        {this.props.readings.map((menuItem, i) => {
          var active = menuItem.path === this.state.active ? 'active' : '';
          return <MenuElement ElementMenu={menuItem} key={menuItem.path} active={active} setActive={this.setActive} />;
        }, this)}
      </div>
    );
  }
}

class MenuElement extends React.Component{
  clickReading = (e) => {
    this.props.setActive(this.props.ElementMenu.path);
  }

  render(){
    return(
      <div className={this.props.active+' item'} >
        <Link className="link" onClick={this.clickReading} to={this.props.ElementMenu.path}>{this.props.ElementMenu.title}</Link>
      </div>
    );
  }
}
