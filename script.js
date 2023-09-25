
var time, alarm, currentH, currentM,
  activeAlarm = false,
  sound = new
  Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");

  sound.loop = true;

  function displayTime() {
    var now = new Date();
    time = now.toLocaleTimeString();
    clock.textContent = time;

      if (time === alarm) {
        sound.play();

        snooze.className = "";
      }
      setTimeout(displayTime, 1000);
  }
  displayTime();

  function addMinSecVals(id) {
    var select = id;
    var min = 59;

      for (i = 0; i <= min; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
      }
  }

  function addHours(id) {
    var select = id;
    var hour = 12;

    for (i = 1; i <= hour; i++) {
      select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
  }


  addMinSecVals(minutes);
  addMinSecVals(seconds);
  addHours(hours);

  startstop.onclick = function() {
    //Set the alarm
    if (activeAlarm === false) {
      hours.disable = true;
      minutes.disable = true;
      seconds.disable = true;
      ampm.disabled = true;

      alarm = hours.value + ":" + minutes.value + ":" + seconds.value + " " + ampm.value;
        this.textContent = "Clear Alarm";
        activeAlarm = true;
    } else {
      //clear the Alarm
      hours.disable = false;
      minutes.disable = false;
      seconds.disable = false;
      ampm.disabled = false;

      sound.pause();
      alarm = "00:00:00 AM";
      this.textContent = "Set Alarm";

      //Hide Snooze button
      snooze.className = "hide";
      activeAlarm = false;
    }
  };

  //Snooze for 5 minutes
  snooze.onclick = function() {
    if (activeAlarm === true) {
      currentH = time.substr(0, time.length - 9);
      currentM = time.substr(currentH.length + 1, time.length - 8);

      if (currentM >= "55") {
        minutes.value = "00";
        hours.value = parseInt(currentH) + 1;
      } else {
        if (parseInt(currentM) + 5 <= 9) {
          minutes.value = "0" + parseInt(currentM + 5);
        } else {
          minutes.value = parseInt(currentM) + 5;
        }
      }

      //Hide the snooze button
      snooze.className = "hide";

      //Now reset alarm
      startstop.click();
      startstop.click();
    }else {
      return false;
    }
  };