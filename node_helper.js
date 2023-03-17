var path = require('path');
var awsIot = require('aws-iot-device-sdk');

const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  start: function() {
    this.projectRoot = process.cwd();
  },
  
  socketNotificationReceived: function (notification, payload) {
    if (notification === "START") {
      const device = awsIot.device({
        keyPath: path.join(this.projectRoot, 'config', payload.keyPath),
        certPath: path.join(this.projectRoot, 'config', payload.certPath),
        caPath: path.join(this.projectRoot, 'config', payload.caPath),
        clientId: payload.clientId,
        host: payload.host
      });
      device.on('connect', () => {
        payload.subscriptions.forEach(subscription => {
          device.subscribe(subscription.topic);
        })
      });

      device.on('message', (topic, mqttPayload) => {
        this.sendSocketNotification("MQTT_PAYLOAD", {
          topic,
          value: mqttPayload.toString() 
        });
      });
    }
  }
});
