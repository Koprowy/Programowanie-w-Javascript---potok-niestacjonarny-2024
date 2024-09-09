let isRecording = false;
let currentChannel = null;
let channels = [[], [], [], []];
let startTime = 0;

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (!audio) return;

    // Odtwarzanie dźwięku
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');

    if (isRecording && currentChannel !== null) {
        const time = Date.now() - startTime;
        channels[currentChannel].push({ keyCode: e.keyCode, time });
    }
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

function startRecording(channelIndex) {
    isRecording = true;
    currentChannel = channelIndex;
    startTime = Date.now();
    channels[currentChannel] = []; // Reset kanału
    console.log(`Rozpoczęto nagrywanie kanału ${channelIndex + 1}`);
}

function stopRecording() {
    isRecording = false;
    currentChannel = null;
    console.log("Nagrywanie zatrzymane");
}

function playChannel(channelIndex) {
    console.log(`Odtwarzanie kanału ${channelIndex + 1}`);
    channels[channelIndex].forEach(note => {
        setTimeout(() => {
            const audio = document.querySelector(`audio[data-key="${note.keyCode}"]`);
            if (audio) {
                audio.currentTime = 0;
                audio.play();
            }
        }, note.time);
    });
}

function playAllChannels() {
    console.log("Odtwarzanie wszystkich kanałów");
    channels.forEach((channel, index) => {
        playChannel(index);
    });
}
