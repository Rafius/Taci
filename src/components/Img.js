import React from 'react';
import { setImageAlerts,setImageEvents } from '../helpers';

const AlertImg = props => {
    let status,imgSource
    if(!!props.alerts){
      imgSource = setImageAlerts(props.alerts.deviceType)
      status = `img-alert animated flash ` + props.alerts.logicalStatus.toLowerCase()
    }else if(!!props.events){
      imgSource = setImageEvents(props.events.level,props.events.result)
      status = `img-event rotation`
    }
    return (
      <img id={`text${props.index}`} alt="presentation" className={`${status}`}
        src={imgSource}/>
    )
}
export default AlertImg;
