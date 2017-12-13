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
  }`;
export const WS_DEVICE=`
  {
  "header":{
    "idRequest":"testConsoleDevMonitor"
  },
  "component":"coreControl",
  "request":{
    "method":"getComponentInfoList",
    "fields":[
      {
        "value":"com.caixabank.tas.lowinterface.common.device.IDeviceComponent"
      }
    ]
  },
  "timestamp":1513095678492
}`

export function addInfoObserver(componentId){
   const random = Math.floor(Math.random() * (10000))
   return `{"header":{"idRequest":"testConsole"},"component":"${componentId}","request":{"method":"addInfoObserver","fields" : [{"value" : "deviceManager_testconsole_${random}"},{"type" : "CALLBACK","className" : "com.caixabank.tas.lowinterface.common.device.IDeviceCallback"}]}}`
}

export function getDeviceInfo(componentId){
   return `{"header":{"idRequest":"testConsole"},"component":"${componentId}","request":{"method":"getDeviceInfo","fields":[]}}`
}
