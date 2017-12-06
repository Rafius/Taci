import React from 'react';
import logo from '../assets/logo.svg';
import '../assets/App.css';
import ATMItem from './ATMItem'

const ATMItemList = props => {
    const data = props.jsonObj.data;
    return (
      <div className="row App">
        <div className="col-lg-12">
          <img src={logo} className="App-logo" alt="logo" />
          <ATMItem Data={data}/>
        </div>
      </div>
    );

}

export default ATMItemList;
