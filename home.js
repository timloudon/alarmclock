// FIX MULTIPLE SET BUTTON ISSUE

// Declarations

let myInterval = null;

// Create HTML elements

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
let alarmButton = document.createElement('input');
let alarmWarning = document.createElement('span');

// Create and append elements

document.body.appendChild(containerElement);
containerElement.appendChild(clockElement);
containerElement.appendChild(alarmElement);

clockElement.appendChild(hoursElement);
clockElement.appendChild(minutesElement);
clockElement.appendChild(secondsElement);

alarmElement.appendChild(alarmSelector);
alarmElement.appendChild(alarmWarning);
alarmSelector.appendChild(alarmLabel);
alarmSelector.appendChild(alarmInput);
alarmSelector.appendChild(alarmButton);

// Create form data

alarmLabel.setAttribute('for', 'alarm-time');
alarmInput.setAttribute('type', 'datetime-local');
alarmInput.setAttribute('id', 'alarm-time');
alarmButton.setAttribute('type', 'button');
alarmButton.setAttribute('value', 'Set Alarm');
alarmButton.setAttribute('id', 'set-alarm');
alarmButton.setAttribute('onclick', 'setAlarm()');
alarmWarning.setAttribute('hidden', '');
alarmWarning.innerText = 'The selected time has already passed';

// Set class attributes

containerElement.className = 'container';
clockElement.className = 'clock';
hoursElement.className = 'hours';
minutesElement.className = 'minutes';
secondsElement.className = 'seconds';
alarmWarning.className = 'alarm-warning';

// Display the current time

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

// Alarm inputs

// Set input elemtent to today's date

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

// Create alarm sound

const alarmSound = new Audio();
alarmSound.src = 'alarm.wav';

// Set alarm

function setAlarm() {

    let userTime = document.getElementById('alarm-time').valueAsNumber;
    let userTimeToDateObject = new Date(userTime);
    let userTimeInteger = userTimeToDateObject.getTime();
    let userTimeAjusted = userTimeInteger - 3600000;

    let now = new Date();
    let nowInteger = now.getTime();

    alarmButton.removeAttribute('onclick', 'setAlarm()');

    if (userTime === '') {
        return alert('Please set a time');
    }

    if (userTimeAjusted <= nowInteger) {
        // alert('Time already passed');
        alarmWarning.removeAttribute('hidden', '');
    } else {
        alarmButton.setAttribute('value', 'Alarm Set');
        alarmWarning.setAttribute('hidden', '');
        checkAlarmIsDue(userTimeAjusted);
    }

}

// Repeatedly check if the alarm is due

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

// Sound alarm

function initAlarm() {
    alarmSound.play();
    alarmButton.setAttribute('value', 'Stop Alarm');
    alarmButton.setAttribute('onclick', 'stopAlarm()');
}

// Stop alarm

function stopAlarm() {
    window.clearInterval(myInterval);
    alarmButton.setAttribute('value', 'Set Alarm');
    alarmButton.setAttribute('onclick', 'setAlarm()');
}