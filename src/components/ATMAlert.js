import React from 'react';
import logo from '../assets/nfc.png';

const ATMAlert = props => {
  // const renderAlert = props.alertListData.map((item, index)=>{
  //      return (
  //        <div key={index} className="col-lg-12 mb-1 column-inline">
  //          <img alt="presentation" className="img-alert"
  //            src={logo}/>
  //        </div>
  //      )
  //  });
  return (
    <div className="row row-inline">
      <div className="col-lg-12 mt-3">
        {/* {renderAlert} */}
      </div>
    </div>
  );
};

export default ATMAlert;
