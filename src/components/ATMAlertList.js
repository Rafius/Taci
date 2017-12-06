import React from 'react';
import ATMAlert from './ATMAlert'

const ATMAlertList = (props) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <span>Soy la cabeza</span>
        <div class="hr"></div>
        <ATMAlert alertListData={props.alertListData}/>
      </div>
    </div>
  );
};

export default ATMAlertList;
