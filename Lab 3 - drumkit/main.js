// notatki z zajęć
// const sound = document.querySelectorAll('sound')
const times = []

times.push({
    key: 'a',
    time: 123
})
const sounds = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
}
addEventListener('keypress',(ev)=>{
    const key = ev.key
    // switch(key) {
    //     case 'a':
    //         clap.currentTime = 0
    //         clap.play()
    //         break;
    //     case 's':
    //         kick.currentTime = 0
    //         kick.play()
    //         break;
    //     case 'd':
    //         hihat.currentTime = 0
    //         hihat.play()
    //         break;
    // }
    const sound = sounds[key]
    console.dir(sound.dataset.key)
    sound.currentTime= 0
    sound.play()
    
})

// wykonanie kodu po określonym czasie
setTimeout(()=>{
    console.log('akuku!')
}, 2_000)

// wykonywanie kodu co określony czas
const handle = setInterval(()=>{
    console.log('akuku 2!')
}, 1_000)
