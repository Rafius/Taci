import React from 'react';
import ATMAction from './ATMAction'

const ATMActionList = props => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <span>Soy el cuerpo</span>
        <ATMAction actionListData={props.actionListData}/>
      </div>
    </div>
  );
};

export default ATMActionList;
