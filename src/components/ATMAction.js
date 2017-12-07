import React from 'react';
import logo from '../assets/safedoor.png';

const ATMAction = props => {
  const renderAction = props.actionListData.map((item, index)=>{
       return (
         <div key={index} className="col-lg-12 mb-3 swing">
           <img alt="presentation" className="img-action"
             src={logo}/>
         </div>
       )
   });
  return (
    <div className="row">
      <div className="col-lg-12">
      {renderAction}
      </div>
    </div>
  );
};

export default ATMAction;
