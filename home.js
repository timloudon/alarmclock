let myInterval = null;

// Calum's homework: make it an alarm clock wich makes a sound (maybe custom sound/multiple sounds/plays a youtube video when the alarm goes off)
// As a user I want to be able to set a specific time the alarm goes off so that I can wake up at a specific time
// Goes off between two times randomly

let containerElement = document.createElement('div');

// Clock elements

let clockElement = document.createElement('div');
let hoursElement = document.createElement('span');
let minutesElement = document.createElement('span');
let secondsElement = document.createElement('span');

// Alarm selector elements

let alarmElement = document.createElement('div');
let alarmSelector = document.createElement('form');
let alarmLabel = document.createElement('label');
let alarmInput = document.createElement('input');
let alarmSet = document.createElement('input');
let alarmStop = document.createElement('input')

// Create and append elements

document.body.appendChild(containerElement);
containerElement.appendChild(clockElement);
containerElement.appendChild(alarmElement);

clockElement.appendChild(hoursElement);
clockElement.appendChild(minutesElement);
clockElement.appendChild(secondsElement);

alarmElement.appendChild(alarmSelector);
alarmSelector.appendChild(alarmLabel);
alarmSelector.appendChild(alarmInput);
alarmSelector.appendChild(alarmSet);
alarmSelector.appendChild(alarmStop);

// Create form data

alarmLabel.setAttribute('for', 'alarm-time');
alarmInput.setAttribute('type', 'datetime-local');
alarmInput.setAttribute('id', 'alarm-time');
alarmSet.setAttribute('type', 'button');
alarmSet.setAttribute('value', 'Set Alarm');
alarmSet.setAttribute('id', 'set-alarm');
alarmSet.setAttribute('onclick', 'setAlarm()');
alarmStop.setAttribute('type', 'button');
alarmStop.setAttribute('value', 'Stop Alarm');
alarmStop.setAttribute('id', 'stop-alarm');
alarmStop.setAttribute('onclick', 'stopAlarm()');

// Set class attribute

containerElement.className = 'container';
clockElement.className = 'clock';
hoursElement.className = 'hours';
minutesElement.className = 'minutes';
secondsElement.className = 'seconds';

function showTime() {
    const now = new Date();
    let seconds = now.getSeconds();
    if (seconds < 10) {
        secondsElement.innerText = '0' + seconds;
    } else {
        secondsElement.innerText = seconds;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutesElement.innerText = '0' + minutes + ':';
    } else {
        minutesElement.innerText = minutes + ':';
    }
    let hours = now.getHours();
    if (hours < 10) {
        hoursElement.innerText = '0' + hours + ':';
    } else {
        hoursElement.innerText = hours + ':';
    }
}

showTime();
setInterval(showTime, 1);

// Alarm code

// Set input elemtent to today's date:

function setDefaultTime() {
    let defaultTime = new Date();
    let rearrangedTime = defaultTime.getFullYear()
        + '-'
        + ('0' + (defaultTime.getMonth() + 1)).slice(-2)
        + '-'
        + ('0' + defaultTime.getDate()).slice(-2)
        + 'T'
        + '00:00';
    // YYYY-MM-DDT00:00
    document.getElementById('alarm-time').setAttribute('value', rearrangedTime);
}
setDefaultTime();

// Creates alarm sound:

const alarmSound = new Audio();
alarmSound.src = 'alarm.wav';

// Sets alarm:

function setAlarm() {

    // Problem: the two time objects (userTimeInteger and nowInteger are not coming out at the same value
    //           - i.e. when converted into integers even when they are the same time they won't equal 0)

    let userTime = document.getElementById('alarm-time').valueAsNumber;
    let userTimeToDateObject = new Date(userTime);
    let userTimeInteger = userTimeToDateObject.getTime();
    let userTimeAjusted = userTimeInteger - 3600000;

    let now = new Date();
    let nowInteger = now.getTime();

    console.log(userTimeToDateObject);
    console.log(now);

    if (userTime === '') {
        return alert('Please set a time');
    }

    if (userTimeAjusted <= nowInteger) {
        alert('Time already passed');
    } else {
        checkAlarmIsDue(userTimeAjusted);
    }

}

// This function worked correctly (setting showTime() interval to every ms solved problem
// of having alarm trigger a second early)

function checkAlarmIsDue(userTimeAjusted) {
    myInterval = setInterval(function () {
        let now = new Date();
        let nowInteger = now.getTime();
        // console.log((userTimeAjusted), (nowInteger));
        if (userTimeAjusted <= nowInteger) {
            initAlarm();
        }
    }, 1)
}

function initAlarm() {
    alarmSound.play();
}

function stopAlarm() {
    // alarmSound.pause();
    // alarmSound.currentTime = 0;
    window.clearInterval(myInterval);
}