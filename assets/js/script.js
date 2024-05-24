// Wait for the DOM to finish loading before running the game

let alphabet = document.getElementsByClassName("alphabet");
let btnVoiceUs = document.getElementById("voice__option--US");
let btnVoiceGb = document.getElementById("voice__option--GB");
let currentWord;
let temporaryAlphabetsArray = [];
let flashalphabets;
let nextAlphabet = document.getElementById("alphabet__next");

// Add event listeners
document.addEventListener('DOMContentLoaded', function () {

    fetchFlashAlphabetsData()

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