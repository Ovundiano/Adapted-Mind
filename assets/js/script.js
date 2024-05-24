// Wait for the DOM to finish loading before running the game

let alphabet = document.getElementsByClassName("alphabet");
let btnVoiceUs = document.getElementById("voice__option--US");
let btnVoiceGb = document.getElementById("voice__option--GB");
let temporaryAlphabetsArray = [];
let alphabets;
let nextAlphabet = document.getElementById("alphabet__next");

// Add event listeners
document.addEventListener('DOMContentLoaded', function () {

    generateAlphabetsData()

    // Change Alphabet on click
    nextAlphabet.addEventListener('click', generateAlphabetsData());

    // Click enter to go to another alphabet
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            generateAlphabetsData();
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
async function generateAlphabetsData() {
    let res = await fetch("assets/js/json/alphabets-data.json");
    alphabets = await res.json();
    generateAlphabetsData();
}

//Add voice on click
function speakFunction(event, lang) {
    event.stopPropagation();
    let msg = new SpeechSynthesisUtterance();
    msg.lang = `en-${lang}`;
    msg.text = currentWord.replace('/', 'or');
    speechSynthesis.speak(msg);
}

//Generate random index for the Alphabets
let createRandom = function () {
    return Math.floor(Math.random() * alphabets.length);
};

/**
 * Function generates the Alphabet for the user
 * with all visible elements
 */
let generateAlphabet = function () {
    if (alphabets.length === 0) {
        alphabets.push.apply(alphabets, temporaryAlphabetsArray);
    }

    let alphabetTopic = document.getElementsByClassName('letter')[0];
    let alphabetImage = document.getElementsByClassName('image')[0];
    let alphabetWord = document.getElementsByClassName('english__word')[0];

    let randomIndex = createRandom();

    alphabetTopic.innerText = alphabets[randomIndex].topic;
    alphabetImage.innerHTML = `<img loading="lazy" src = ${alphabets[randomIndex].image} alt=${alphabets[randomIndex].imageAlt}>`;
    alphabetWord.innerText = alphabets[randomIndex].word;

    currentWord = alphabets[randomIndex].word;

    temporaryAlphabetsArray.push(alphabets[randomIndex]);
    alphabets.splice([randomIndex], 1);
};