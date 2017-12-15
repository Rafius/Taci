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
                "value": "12345"
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
     date: events[1].value,
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
      return  require(`../assets/user.png`)
    case 2:
      return  require(`../assets/card.png`)
    case 3:
      if(result === 0){
        return  require(`../assets/ok.png`)
      }else if(result === 1){
        return  require(`../assets/close.png`)
      }
    case 4:
    if(result === 0){
      return  require(`../assets/ok.png`)
    }else if(result === 1){
      return  require(`../assets/close.png`)
    }else if(result === 2){
      return  require(`../assets/cancel.png`)
    }
    case 5:
    if(result === 0){
      return  require(`../assets/ok.png`)
    }else if(result === 1){
      return  require(`../assets/close.png`)
    }else if(result === 2){
      return  require(`../assets/cancel.png`)
    }else if(result === 3){
      return  require(`../assets/watch.ico`)
    }
    default:
      return  require(`../assets/user.png`)
  }
}
