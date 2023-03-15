const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  socketNotificationReceived: function (notification, payload) {
    Log.info('notification:', notification)
    Log.info('payload:', payload)
  }
});
