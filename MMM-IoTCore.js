Module.register("MMM-IoTCore", {
  defaults: {},

  start: function () {
    this.sendSocketNotification("START", this.config);
  },

  socketNotificationReceived: function (notification, payload) {
    Log.info(this.name, ' socketNotificationReceived:')
  },


  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = this.config.text;
    return wrapper;
  }
});
