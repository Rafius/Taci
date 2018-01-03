import moment from 'moment';
// PARAMETER FOR WS
export const WS_COMPONENT=`
  {
    "component":"taciPoc",
    "request":{
      "method":"doConnect",
      "fields":[
        {
          "type": "CALLBACK",
          "className": "com.caixabank.tas.ml.component.debug.tacipoc.ITaciPocCallback"
        }
      ]
    }
  }`
export const WS_DEVICE_MANAGER=`
  {
    "header": {
        "idRequest": "testConsole"
      },
    "component": "deviceManager",
    "request": {
        "method": "getListDeviceInfo",
        "fields": []
    }
  }`
export const WS_DEVICE_NOTIFIER=`
  {
  "header": {
      "idRequest": "testConsole"
    },
    "component": "deviceNotifier",
    "request": {
        "method": "registerObserver",
        "fields": [
            {
                "className": "java.lang.String",
                "value": "123245"
            },
            {
                "type": "CALLBACK",
                "className": "com.caixabank.tas.core.component.notifier.INotifierObserverCallback"
            }
        ]
    }
  }`

export function parseEvents(events){
  return {
     text: events[0].value,
     date: moment(events[1].value).unix(),
     level: events[3].value,
     result: events[4].value
  }
}
export function parseAlerts(alerts){
  const arrayAlerts = []
  let j = 0;
  for (let i=0;i<alerts.length;i++){
    if(alerts[i].deviceInfo.logicalStatus !== 'INSERVICE'){
      arrayAlerts[j] = {
        deviceType: alerts[i].id,
        logicalStatus: alerts[i].deviceInfo.logicalStatus
      }
       j++;
    }
  }
  return arrayAlerts
}

export function setImageAlerts(src){
  return require(`../assets/${src.toLowerCase()}.png`)
}
export function setImageEvents(level,result){
  switch(level){
    case 1:
      return  require(`../assets/profile.png`)
    case 2:
      return  require(`../assets/Circle-icons-creditcard.svg.png`)
    case 3:
      if(result === 0){
        return  require(`../assets/ok.png`)
      }else if(result === 1){
        return  require(`../assets/denied.png`)
      } break;
    case 4:
      if(result === 0){
        return  require(`../assets/ok.png`)
      }else if(result === 1){
        return  require(`../assets/close.png`)
      }else if(result === 2){
        return  require(`../assets/denied.png`)
      } break;
    case 5:
      if(result === 0){
        return  require(`../assets/ok.png`)
      }else if(result === 1){
        return  require(`../assets/close.png`)
      }else if(result === 2){
        return  require(`../assets/denied.png`)
      }else if(result === 3){
        return  require(`../assets/hourglass.png`)
      } break;
    default:
      return  require(`../assets/profile.png`)
  }
}
export function translationOutIcons(events){
    for(var i=0;i<= events.length;i++){
      if(i > 0 && i<events.length-1){
          document.getElementById(`div${events.length-i}`).classList = "invisible";
          document.getElementById(`div${events.length-i-1}`).classList.add('translationOut');
          document.getElementById(`text${events.length-i-1}`).classList.add('rotationOut');
      }else if(i === 0){
        document.getElementById(`div${events.length-1}`).classList.add('translationOut');
        document.getElementById(`text${events.length-1}`).classList.add('rotationOut');
      }else if(i === events.length){
        document.getElementById(`events`).classList.add('animated','fadeOut');
      }
    }
}
