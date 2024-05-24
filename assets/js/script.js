// Wait for the DOM to finish loading before running the game

let alphabet = document.getElementsByClassName("alphabet");
let btnVoiceUs = document.getElementById("voice__option--US");
let btnVoiceGb = document.getElementById("voice__option--GB");
let currentWord;
let temporaryAlphabetsArray = [];
let alphabets;
let nextAlphabet = document.getElementById("alphabet__next");

// Add event listeners
document.addEventListener('DOMContentLoaded', function () {

    fetchAlphabetsData()

    // Change Alphabet on click
    nextAlphabet.addEventListener('click', generateAlphabet);

    // Click enter to go to another alphabet
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            generateAlphabet();
        }
    })

    //listen click for audio
    btnVoiceUs.addEventListener('click', function (event) {
        speakFunction(event, "US");
    });
    btnVoiceGb.addEventListener('click', function (event) {
        speakFunction(event, "GB");
    });
})

//Fetch data from the JSON file
async function fetchAlphabetsData() {
    let res = await fetch("assets/js/json/alphabets-data.json");
    alphabets = await res.json();
    generateAlphabet ();
}

//Add voice on click
function speakFunction(event, lang) {
    event.stopPropagation();
    let msg = new SpeechSynthesisUtterance();
    msg.lang = `en-${lang}`;
    msg.text = currentWord.replace('/', 'or');
    speechSynthesis.speak(msg);
}