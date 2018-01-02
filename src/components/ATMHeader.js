import React, {Component} from 'react';
import logo from '../assets/punt groc.png';

class ATMHeader extends Component{
  render(){
    return (
      <div className="row">
        <div className="col-lg-12 mt-2">
            <img alt="presentation" className="img-tas inservice"
              src={logo}/>
        </div>
        <div className="col-lg-12 justify-content-center">
          <h4>{this.props.number}</h4>
        </div>
      </div>
    )
  }
}

export default ATMHeader;
