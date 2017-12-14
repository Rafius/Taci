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
     result: events[3].value,
     level: events[4].value
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
