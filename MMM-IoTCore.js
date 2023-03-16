Module.register("MMM-IoTCore", {
  defaults: {
    keyPath: "",
    certPath: "",
    caPath: "",
    host: "",
    subscriptions: [],
  },

  start: function () {
    this.subscriptions = this.config.subscriptions.map(s => {
      return {
        ...s,
        value: "-",
      }
    })

    this.sendSocketNotification("START", this.config);
    setInterval(() => {
      this.updateDom(100);
    }, 5000);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "MQTT_PAYLOAD") {
      const index = this.subscriptions.findIndex(s => s.topic === payload.topic)
      if (index !== -1) {
        this.subscriptions[index].value = payload.value
        this.updateDom();
      }
    }
  },

  getStyles: function () {
    return ["index.css"];
  },

  getDom: function() {
    const wrapper = document.createElement("table");
    this.subscriptions.forEach(s => {
      const trElement = document.createElement("tr");

      const labelElement = document.createElement("td");
      labelElement.innerHTML = s.label;
      trElement.appendChild(labelElement);

      const valueElement = document.createElement("td");
      valueElement.className = "value";
      valueElement.innerHTML = s.value;
      console.log('s.value:', s.value)
      trElement.appendChild(valueElement);

      const suffixElement = document.createElement("td");
      suffixElement.innerHTML = s.suffix;
      trElement.appendChild(suffixElement);

      if (s.colors?.length > 0 && s.value !== "-") {
        let targetColor = s.colors.sort((a,b) => a.upTo - b.upTo)
          .find(c => c.upTo > s.value) || s.colors[s.colors.length - 1];
        labelElement.style.color = targetColor.label;
        valueElement.style.color = targetColor.value;
        suffixElement.style.color = targetColor.suffix;
      }

      wrapper.appendChild(trElement);
    })

    return wrapper
  }
});
