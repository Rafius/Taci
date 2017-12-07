import React from 'react';
import ATMItem from './ATMItem'

const ATMItemList = props => {
    const data = props.jsonObj.data;
    return (
      <div className="row App">
        <div className="col-lg-12">
          <ATMItem Data={data}/>
        </div>
      </div>
    );

}

export default ATMItemList;
