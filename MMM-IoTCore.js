Module.register("MMM-IoTCore", {
  defaults: {
    keyPath: "",
    certPath: "",
    caPath: "",
    host: "",
    subscriptions: [],
  },

  start: function () {
    this.subscriptionsData = this.config.subscriptions.map(s => {
      return {
        topic: s.topic,
        label: s.label,
        value: "-",
        suffix: s.suffix,
      }
    })

    this.sendSocketNotification("START", this.config);
    setInterval(() => {
      this.updateDom(100);
    }, 5000);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "MQTT_PAYLOAD") {
      const index = this.subscriptionsData.findIndex(s => s.topic === payload.topic)
      if (index !== -1) {
        this.subscriptionsData[index].value = payload.value
        this.updateDom();
      }
    }
  },

  getStyles: function () {
    return ["index.css"];
  },

  getDom: function() {
    const wrapper = document.createElement("table");
    this.subscriptionsData.forEach(s => {
      const trElement = document.createElement("tr");

      const labelElement = document.createElement("td");
      labelElement.innerHTML = s.label;
      trElement.appendChild(labelElement);

      const valueElement = document.createElement("td");
      valueElement.className = "value";
      valueElement.innerHTML = s.value;
      trElement.appendChild(valueElement);

      const suffixElement = document.createElement("td");
      suffixElement.innerHTML = s.suffix;
      trElement.appendChild(suffixElement);

      wrapper.appendChild(trElement);
    })

    return wrapper
  }
});
