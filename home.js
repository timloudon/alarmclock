// To Do:
// - write resetDefaultTime function to refill placeholder text
// - fix flow problem for alarmstopping (using cal's abstracted functions principle)
// - adding a delay on the mousedown event (using async function example here - https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript)

// Re-write code using MomentJS

// Declarations and sounds

// Note: datetime-local input type needs timestring format: YYYY-MM-DDT00:00

let now = null;
let userTime = null;
let alarmSound = null;
let nowFormated = null;

let myInterval = null;
let myOtherInterval = null;
let mouseDownTimeout = null;

const alarmSoundOne = new Audio();
alarmSoundOne.src = './sounds/soundone.wav';
const alarmSoundTwo = new Audio();
alarmSoundTwo.src = './sounds/soundtwo.wav';
const alarmSoundThree = new Audio();
alarmSoundThree.src = './sounds/soundthree.wav';
const alarmSoundFour = new Audio();
alarmSoundFour.src = './sounds/soundfour.wav';
const alarmSoundFive = new Audio();
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

let soundElement = document.createElement('div');
let oneContainer = document.createElement('div');
let soundOne = document.createElement('input');
let soundOneLabel = document.createElement('label');
let twoContainer = document.createElement('div');
let soundTwo = document.createElement('input');
let soundTwoLabel = document.createElement('label');
let threeContainer = document.createElement('div');
let soundThree = document.createElement('input');
let soundThreeLabel = document.createElement('label');
let fourContainer = document.createElement('div');
let soundFour = document.createElement('input');
let soundFourLabel = document.createElement('label');

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
soundElement.appendChild(twoContainer);
twoContainer.appendChild(soundTwo);
twoContainer.appendChild(soundTwoLabel);
soundElement.appendChild(threeContainer);
threeContainer.appendChild(soundThree);
threeContainer.appendChild(soundThreeLabel);
soundElement.appendChild(fourContainer);
fourContainer.appendChild(soundFour);
fourContainer.appendChild(soundFourLabel);

// Create form data

containerElement.setAttribute('id', 'container');

clockElement.setAttribute('id', 'clock-container');

alarmElement.setAttribute('id', 'alarm-container');
alarmSelector.setAttribute('id', 'alarm-form');
alarmLabel.setAttribute('for', 'alarm-time');
alarmInput.setAttribute('type', 'datetime-local');
alarmInput.setAttribute('id', 'alarm-time');
alarmInput.setAttribute('name', 'datetime-field');

alarmButton.setAttribute('type', 'button');
alarmButton.setAttribute('value', 'Set Alarm');
alarmButton.setAttribute('id', 'set-alarm');
alarmButton.setAttribute('onclick', 'setAlarm()');

alarmWarning.setAttribute('hidden', '');
alarmWarning.innerText = 'The selected time has already passed';

soundElement.setAttribute('id', 'sound-container');
oneContainer.setAttribute('id', 'one-container');
oneContainer.setAttribute('class', 'alarm-selector');
soundOne.setAttribute('type', 'radio');
soundOne.setAttribute('id', 'one');
soundOne.setAttribute('name', 'alarm-sound');
soundOne.setAttribute('value', 'one');
soundOne.setAttribute('checked', '');
soundOneLabel.setAttribute('for', 'one');
soundOneLabel.setAttribute('id', 'one')
soundOneLabel.innerText = 'One';
twoContainer.setAttribute('id', 'two-container');
twoContainer.setAttribute('class', 'alarm-selector');
soundTwo.setAttribute('type', 'radio');
soundTwo.setAttribute('id', 'two');
soundTwo.setAttribute('name', 'alarm-sound');
soundTwo.setAttribute('value', 'two');
soundTwoLabel.setAttribute('for', 'two');
soundTwoLabel.innerText = 'Two';
threeContainer.setAttribute('id', 'three-container');
threeContainer.setAttribute('class', 'alarm-selector');
soundThree.setAttribute('type', 'radio');
soundThree.setAttribute('id', 'three');
soundThree.setAttribute('name', 'alarm-sound');
soundThree.setAttribute('value', 'three');
soundThreeLabel.setAttribute('for', 'three');
soundThreeLabel.innerText = 'Three';
fourContainer.setAttribute('id', 'four-container');
fourContainer.setAttribute('class', 'alarm-selector');
soundFour.setAttribute('type', 'radio');
soundFour.setAttribute('id', 'four');
soundFour.setAttribute('name', 'alarm-sound');
soundFour.setAttribute('value', 'four');
soundFourLabel.setAttribute('for', 'four');
soundFourLabel.innerText = 'Four';

soundOne.className = 'one';
soundOneLabel.className = 'one';
soundTwo.className = 'two';
soundTwoLabel.className = 'two';
soundThree.className = 'three';
soundThreeLabel.className = 'three';
soundFour.className = 'four';
soundFourLabel.className = 'four';

// --------------------

// Set & display time

// --------------------

// Display the time and also update the HH:mm in the datetime-local placeholder

function showTime() {
    now = moment().format('HH:mm:ss');
    nowFormated = moment().format('YYYY-MM-DDTHH:mm');
    alarmInput.setAttribute('value', nowFormated);
    hoursElement.innerText = now;
}
showTime();
setInterval(showTime, 1000);

// Set placeholder for datetime-local input field

function setButtonToSetAlarm() {
    alarmButton.setAttribute('onclick', 'setAlarm()');
    alarmButton.setAttribute('value', 'Set Alarm');
}

function setButtonToResetAlarm() {
    alarmButton.setAttribute('value', 'Reset Alarm');
    alarmButton.setAttribute('onclick', 'resetAlarm()');
}

function setButtonToStopAlarm() {
    alarmButton.setAttribute('value', 'Stop Alarm');
    alarmButton.setAttribute('onclick', 'stopAlarm()');
}

// --------------------

// Preview alarms

// --------------------

// Setup the preview alarm functions with the individual sounds

setupAlarmSoundButton('one-container', alarmSoundOne);
setupAlarmSoundButton('two-container', alarmSoundTwo);
setupAlarmSoundButton('three-container', alarmSoundThree);
setupAlarmSoundButton('four-container', alarmSoundFour);

function setupAlarmSoundButton(elementId, alarmSound) {
    const alarm = document.getElementById(elementId);
    alarm.addEventListener('mousedown', getMouseDownEventHandler(alarmSound));
    alarm.addEventListener('mouseup', getMouseUpEventHandler(alarmSound));
}

// Play the selected preview alarm sound on mousedown
// leaving an interval so the sound doesn't trigger on a fast click 

function getMouseDownEventHandler(sound){
    return () => {mouseDownTimeout = setTimeout(() => previewAlarmSound(sound), 100);}
}

function previewAlarmSound(sound) {
    sound.play();
}

// Stop the selected preview alarm sound on mouseup 

function getMouseUpEventHandler(sound){
    return () => stopAlarmSound(sound);
}

function stopAlarmSound(sound) {
    window.clearTimeout(mouseDownTimeout);
    sound.pause();
    sound.currentTime = 0;
}

// --------------------

// Alarm sequence

// --------------------

// Set alarm

function setAlarm() {
    // take only hours and minutes from userTime
    let userAlarmTime = document.getElementById('alarm-time').value.slice(11);
    setButtonToResetAlarm();
    checkAlarmIsDue(userAlarmTime); // temp to trigger alarm immediately
    // if (userAlarmTime <= now) {
    //     alarmWarning.removeAttribute('hidden', '');
    // } else {
    //     alarmWarning.setAttribute('hidden', '');
    //     checkAlarmIsDue(userAlarmTime);
    // }
}

function resetAlarm() {
    window.clearInterval(myInterval);
    document.getElementsByName('datetime-field')[0].value = '';
    document.getElementsByName('datetime-field')[0].value = nowFormated;
    setButtonToSetAlarm();
}

// Repeatedly check if the alarm is due

function checkAlarmIsDue(alarm) {
    myInterval = setInterval(function () {
        if (alarm <= now) {
            initAlarm();
        }
    }, 250);
}

// Sound alarm

function initAlarm() {
    
    setButtonToStopAlarm();
    window.clearInterval(myInterval);
    if (soundOne.checked) {
        alarmSound = alarmSoundOne;
    } else if (soundTwo.checked) {
        alarmSound = alarmSoundTwo;
    } else if (soundThree.checked) {
        alarmSound = alarmSoundThree;
    } else if (soundFour.checked) {
        alarmSound = alarmSoundFour;
    } else if (soundFive.checked) {
        alarmSound = alarmSoundFive;
    } else {
        alarmSound = alarmSoundOne;
    }
    myOtherInterval = setInterval(() => {
        alarmSound.play();
    }, 100);
}

function stopAlarm() {
    console.log('stop alarm');
    clearInterval(myOtherInterval);
    stopAlarmSound(alarmSound);
    resetAlarm();
}

// --------------------

// Interesting issues

// --------------------

// The following results in a strange error in Brave (trying to use a function to play and stop the alarm preview):

// function previewAlarmSound(sound) {
//     sound.play();
// }

// function stopAlarmSound (sound) {
//     sound.pause();
//     sound.currentTime = 0;
// }

// const alarmOne = document.getElementById('one-container');
// alarmOne.addEventListener('mousedown', previewAlarmSound(alarmSoundOne));
// alarmOne.addEventListener('mouseup', stopAlarmSound(alarmSoundOne));

// Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22

// --

// setTimeout triggers on load, rater than on the mousedown

// oneContainer.onmousedown = (setTimeout(()) => {
//     console.log('class hover one');
//     alarmSoundOne.play();   
// }, 1000);// Re-write code using MomentJS