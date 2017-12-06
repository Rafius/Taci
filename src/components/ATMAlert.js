import React from 'react';

const ATMAlert = props => {
  const renderAlert = props.alertListData.map((item, index)=>{
       return (
         <div key={index} className="col-lg-12">
           SOY UNA ALERTA !!! {item.name}
         </div>
       )
   });
  return (
    <div className="row">
      <div className="col-lg-12">
        {renderAlert}
      </div>
    </div>
  );
};

export default ATMAlert;
