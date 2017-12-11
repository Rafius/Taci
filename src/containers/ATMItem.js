import React from 'react';
import ATMAlertList from '../components/ATMAlertList'
import ATMActionList from '../components/ATMActionList'

const ATMItem = props => {
  const alertListData = props.Data.alerts;
  const actionListData = props.Data.actions;

  const renderRows = actionListData.map((item, index)=>{
       return (
         <div key={index} className="col-sm-12 col-md-4 my-3">
           <ATMAlertList alertListData={alertListData}/>
           <ATMActionList actionListData={actionListData}/>
         </div>
       )
   });

  return (
    <div className="row">
      {renderRows}
    </div>
  );
};

export default ATMItem;
