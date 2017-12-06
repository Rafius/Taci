import React from 'react';

const ATMAction = props => {
  const renderAction = props.actionListData.map((item, index)=>{
       return (
         <div key={index} className="col-lg-12">
           SOY UNA ACTION !!! {item.name}
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
