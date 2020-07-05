// Re-write code using MomentJS

// Declarations and sounds

let myInterval = null;
let alarmSound = null;

let alarmSoundOne = new Audio();
alarmSoundOne.src = './sounds/soundone.wav';
let alarmSoundTwo = new Audio();
alarmSoundTwo.src = './sounds/soundtwo.wav';
let alarmSoundThree = new Audio();
alarmSoundThree.src = './sounds/soundthree.wav';
let alarmSoundFour = new Audio();
alarmSoundFour.src = './sounds/soundfour.wav';
let alarmSoundFive = new Audio();
alarmSoundFive.src = './sounds/soundfive.wav';

// Create HTML elements

let containerElement = document.createElement('div');

// Clock elements

let clockElement = document.createElement('div');
    let hoursElement = document.createElement('span');
    let minutesElement = document.createElement('span');
    let secondsElement = document.createElement('span');

// Alarm set form elements

let alarmElement = document.createElement('div');
let alarmSelector = document.createElement('form');
let alarmLabel = document.createElement('label');
let alarmInput = document.createElement('input');
let alarmButton = document.createElement('input');
let alarmWarning = document.createElement('span');

// Alarm sound selectors

// Try making a function that creates the elements

let soundElement = document.createElement('div');
    let oneContainer = document.createElement('div');
        let soundOne = document.createElement('input');
        let soundOneLabel = document.createElement('label');
    let soundTwo = document.createElement('input');
    let soundTwoLabel = document.createElement('label');
    let soundThree = document.createElement('input');
    let soundThreeLabel = document.createElement('label');
    let soundFour = document.createElement('input');
    let soundFourLabel = document.createElement('label');
    let soundFive = document.createElement('input');
    let soundFiveLabel = document.createElement('label');

// Create and append elements

document.body.appendChild(containerElement);
    containerElement.appendChild(clockElement);
        clockElement.appendChild(hoursElement);
        clockElement.appendChild(minutesElement);
        clockElement.appendChild(secondsElement);
    containerElement.appendChild(alarmElement);
        alarmElement.appendChild(alarmSelector);
        alarmElement.appendChild(alarmWarning);
        alarmSelector.appendChild(alarmLabel);
        alarmSelector.appendChild(alarmInput);
        alarmSelector.appendChild(alarmButton);
    containerElement.appendChild(soundElement);
        soundElement.appendChild(oneContainer);
            oneContainer.appendChild(soundOne);
            oneContainer.appendChild(soundOneLabel);
        soundElement.appendChild(soundTwo);
        soundElement.appendChild(soundTwoLabel);
        soundElement.appendChild(soundThree);
        soundElement.appendChild(soundThreeLabel);
        soundElement.appendChild(soundFour);
        soundElement.appendChild(soundFourLabel);
        soundElement.appendChild(soundFive);
        soundElement.appendChild(soundFiveLabel);

// Create form data

containerElement.setAttribute('id', 'container');

clockElement.setAttribute('id', 'clock-container');

alarmElement.setAttribute('id', 'alarm-container');
alarmSelector.setAttribute('id', 'alarm-form');
alarmLabel.setAttribute('for', 'alarm-time');
alarmInput.setAttribute('type', 'datetime-local');
alarmInput.setAttribute('id', 'alarm-time');

alarmButton.setAttribute('type', 'button');
alarmButton.setAttribute('value', 'Set Alarm');
alarmButton.setAttribute('id', 'set-alarm');
alarmButton.setAttribute('onclick', 'setAlarm()');

alarmWarning.setAttribute('hidden', '');
alarmWarning.innerText = 'The selected time has already passed';

soundElement.setAttribute('id', 'sound-container');
oneContainer.setAttribute('id', 'one-container');
soundOne.setAttribute('type', 'radio');
soundOne.setAttribute('id', 'one');
soundOne.setAttribute('name', 'alarm-sound');
soundOne.setAttribute('value', 'one');
soundOne.setAttribute('checked', '');
soundOneLabel.setAttribute('for', 'one');
soundOneLabel.setAttribute('id', 'one')
soundOneLabel.innerText = 'One';
soundTwo.setAttribute('type', 'radio');
soundTwo.setAttribute('id', 'two');
soundTwo.setAttribute('name', 'alarm-sound');
soundTwo.setAttribute('value', 'two');
soundTwoLabel.setAttribute('for', 'two');
soundTwoLabel.innerText = 'Two';
soundThree.setAttribute('type', 'radio');
soundThree.setAttribute('id', 'three');
soundThree.setAttribute('name', 'alarm-sound');
soundThree.setAttribute('value', 'three');
soundThreeLabel.setAttribute('for', 'three');
soundThreeLabel.innerText = 'Three';
soundFour.setAttribute('type', 'radio');
soundFour.setAttribute('id', 'four');
soundFour.setAttribute('name', 'alarm-sound');
soundFour.setAttribute('value', 'four');
soundFourLabel.setAttribute('for', 'four');
soundFourLabel.innerText = 'Four';
soundFive.setAttribute('type', 'radio');
soundFive.setAttribute('id', 'five');
soundFive.setAttribute('name', 'alarm-sound');
soundFive.setAttribute('value', 'five');
soundFiveLabel.setAttribute('for', 'five');
soundFiveLabel.innerText = 'Five';

soundOne.className = 'one';
soundOneLabel.className = 'one';

let newThing = document.createElement('span');
containerElement.appendChild(newThing);
newThing.innerText = moment().format('LTS');

// Display the current time

function showTime() {
    hoursElement.innerText = moment().format('hh:mm:ss');
}

// function showTime() {
//     const now = new Date();
//     let seconds = now.getSeconds();
//     if (seconds < 10) {
//         secondsElement.innerText = '0' + seconds;
//     } else {
//         secondsElement.innerText = seconds;
//     }
//     let minutes = now.getMinutes();
//     if (minutes < 10) {
//         minutesElement.innerText = '0' + minutes + ':';
//     } else {
//         minutesElement.innerText = minutes + ':';
//     }
//     let hours = now.getHours();
//     if (hours < 10) {
//         hoursElement.innerText = '0' + hours + ':';
//     } else {
//         hoursElement.innerText = hours + ':';
//     }
// }
showTime();
setInterval(showTime, 1000);

// Alarm inputs

// Set input elemtent to today's date and current time on load

function setDefaultTime() {
    console.log('default time set');
    let defaultTime = new Date();
    let rearrangedTime = defaultTime.getFullYear()
        + '-'
        + ('0' + (defaultTime.getMonth() + 1)).slice(-2)
        + '-'
        + ('0' + defaultTime.getDate()).slice(-2)
        + 'T'
        + ('0' + (defaultTime.getHours() + 1)).slice(-2)
        + ':'
        + ('0' + defaultTime.getMinutes()).slice(-2);
        console.log('rearrangedTime', rearrangedTime);
    // YYYY-MM-DDT00:00
    alarmInput.setAttribute('value', rearrangedTime);
    console.log(defaultTime.getHours(), defaultTime.getMinutes());
}
setDefaultTime();

// Hover to preview sound

oneContainer.onmouseover = function () {
    console.log('class hover one');
    alarmSoundOne.play();   
}
oneContainer.onmouseleave = function () {
    console.log('class leave one');
    alarmSoundOne.pause();
    alarmSoundOne.currentTime = 0;   
}

// Set alarm

function setAlarm() {

    console.log('alarm set');

    let userTime = document.getElementById('alarm-time').valueAsNumber;
    let userTimeToDateObject = new Date(userTime);
    let userTimeInteger = userTimeToDateObject.getTime();
    // let userTimeAjusted = userTimeInteger - 3600000;

    console.log('usertime', userTimeToDateObject);

    let now = new Date();
    let nowInteger = now.getTime();

    console.log('time now', now);

    if (userTime === '') {
        return alert('Please set a time');
    }

    if (userTimeAjusted <= nowInteger) {
        // alert('Time already passed');
        alarmWarning.removeAttribute('hidden', '');
    } else {
        // alarmButton.setAttribute('value', 'Alarm Set');
        // replace with span showing time set
        alarmWarning.setAttribute('hidden', '');
        checkAlarmIsDue(userTimeAjusted);
    }

}

// Repeatedly check if the alarm is due

function checkAlarmIsDue(userTimeAjusted) {
    alarmButton.setAttribute('value', 'Reset Alarm');
    alarmButton.setAttribute('onclick', 'stopAlarm()');
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

    console.log('alarm sounding');

    // CORNER CASE PROBLEM: while alarm is playing if you select another sound it starts playing

    if (soundOne.checked === true) {
        alarmSound = alarmSoundOne;
    } else if (soundTwo.checked === true) {
        alarmSound = alarmSoundTwo;
    } else if (soundThree.checked === true) {
        alarmSound = alarmSoundThree;
    } else if (soundFour.checked === true) {
        alarmSound = alarmSoundFour;
    } else if (soundFive.checked === true) {
        alarmSound = alarmSoundFive;
    } else {
        alarmSound = alarmSoundOne;
    }

    alarmSound.play();

    alarmButton.setAttribute('value', 'Stop Alarm');
    alarmButton.setAttribute('onclick', 'stopAlarm()');
}

// Stop alarm

function stopAlarm() {

    console.log('stop alarm or reset alarm');

    window.clearInterval(myInterval);

    alarmSound.pause();
    alarmSound.currentTime = 0;

    alarmButton.setAttribute('value', 'Set Alarm');
    alarmButton.setAttribute('onclick', 'setAlarm()');
    alarmSelector.reset(); // resets the datetime-local form so that setDefaultTime() can re-fill the current date and time
    setDefaultTime();
}