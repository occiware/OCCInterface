import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actionIndex.js';
import {toolify} from '../utils.js';

export default class ModalConfirmationPost extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      del: '',
      seeDetails: false
    };
  }

  render() {
    var postInfos = typeof this.state.post !== 'undefined' && this.state.seeDetails ? <div className="ui segment segmentDataPost">
                      <p><strong>POST:</strong></p>
                      <pre className="segmentpadding datasPost">{toolify(this.state.post)}</pre>
                    </div> : null;

    var delInfos = typeof this.state.del !== 'undefined' && this.state.seeDetails ? <div className="ui segment segmentDataPost">
                      <p><strong>DEL:</strong></p>
                      <pre className="segmentpadding datasDel">{this.state.del}</pre>
                    </div> : null;
    return(
      <div className="ui basic modal confirmationPost">
        <div className="description myCentering">
          <p>You are going to create and/or delete datas into the current server, are you sure?</p>
          {postInfos}
          {delInfos}
          <a href="" onClick={(e) => {e.preventDefault(); this.setState({seeDetails: !this.state.seeDetails})}}>
            {this.state.seeDetails ? 'Hide': 'See'} details</a>
        </div>

        <div className="actions">
            <div className="ui ok green basic right inverted button">
              <i className="checkmark icon"></i>
              Yes
            </div>
            <div className="ui cancel red basic right inverted button">
              <i className="remove icon"></i>
              No
            </div>
        </div>

      </div>
    );
  }
}
