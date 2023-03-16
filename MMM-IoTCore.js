Module.register("MMM-IoTCore", {
  defaults: {
    keyPath: "",
    certPath: "",
    caPath: "",
    host: "",
    subscriptions: [],
  },

  start: function () {
    this.sendSocketNotification("START", this.config);
  },

  socketNotificationReceived: function (notification, payload) {
    Log.info(this.name, ' socketNotificationReceived:')
  },

  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = "Hello"
    return wrapper;
  }
});
