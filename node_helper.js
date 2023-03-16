var awsIot = require('aws-iot-device-sdk');

const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  start: function() {
    console.log('start')
  },
  
  socketNotificationReceived: function (notification, payload) {
    console.log('notification:', notification)
    console.log('payload:', payload)
    if (notification === "START") {
      const device = awsIot.device({
        keyPath: payload.keyPath,
        certPath: payload.certPath,
        caPath: payload.caPath,
        clientId: payload.clientId,
        host: payload.host
      });
      device.on('connect', function() {
        console.log('connect');
        device.subscribe('/#');
      });

      device.on('message', function(topic, payload) {
        console.log('message', topic, payload.toString());
      });
    }
  }
});
