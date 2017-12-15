import React from 'react';
import { setImageAlerts,setImageEvents } from '../helpers';

const AlertImg = props => {
    let status,imgSource
    if(!!props.alerts){
      imgSource = setImageAlerts(props.alerts.deviceType)
      status = `img-alert animated flash infinite ` + props.alerts.logicalStatus.toLowerCase()
      console.log(status)
    }else if(!!props.events){
      imgSource = setImageEvents(props.events.level,props.events.result)
      status = `img-event`
    }
    return (
      <img alt="presentation" className={`${status}`}
        src={imgSource}/>
    )
}
export default AlertImg;
