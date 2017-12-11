import React from 'react';
import ATMAlertList from '../components/ATMAlertList'
import ATMActionList from '../components/ATMActionList'

const ATMItem = () => {
  // const renderItems = length.map((index)=>{
  //      return (
  //        <div key={index} className="col-sm-12 col-md-4 my-3">
  //          <ATMAlertList/>
  //          <ATMActionList/>
  //        </div>
  //      )
  //  });

  return (
    <div className="row">
      <div className="col-sm-12 col-md-4 my-3">
        <ATMAlertList/>
        <ATMActionList/>
      </div>
       <div className="col-sm-12 col-md-4 my-3">
         <ATMAlertList/>
         <ATMActionList/>
       </div>
       <div className="col-sm-12 col-md-4 my-3">
          <ATMAlertList/>
          <ATMActionList/>
        </div>
    </div>
  );
};

export default ATMItem;
