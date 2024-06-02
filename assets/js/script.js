/* jshint esversion:8 */

// Wait for the DOM to finish loading before running the game

// Add event listeners to button element after getting them
//Coding Kowledge of EventListener gotten from Tutorial Lessons of Code Institute(https://learn.codeinstitute.net/courses/course-v1:CodeInstitute+LM101+3/courseware/2d651bf3f23e48aeb9b9218871912b2e/78f3c10a937c4fe09640c7c0098d16bd/)

document.addEventListener('DOMContentLoaded', function () {
    let nextAlphabet = document.getElementById("next-alphabet");

    //Idea of fetch () function code gotten from flash_cards(https://github.com/IuliiaKonovalova/flash_cards/blob/main/assets/js/cards.js) and indepth knowledge gotten from geeksforgeeks(https://www.geeksforgeeks.org/how-to-use-the-javascript-fetch-api-to-get-data/?ref=ml_lbp)
    fetchAlphabetsData();

    //Click Next Alphabet Button to Get Next Alphabet
    nextAlphabet.addEventListener('click', function() {
        generateAlphabet()
        console.log('Next Alphabet Button clicked!');
    });

    //Click Enter Key to Get Next Alphabet
    nextAlphabet.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            generateAlphabet();
        }
        console.log('Enter Key clicked!');
    });

    //Click Speaker Icon to Listen To Accents Audio
    let btnAccentsUs = document.getElementById("accents-US");
    let btnAccentsGb = document.getElementById("accents-GB");

    btnAccentsUs.addEventListener('click', function (event) {
        speakFunction(event, "US");
        console.log('US speaker Icon Clicked');

    });
    btnAccentsGb.addEventListener('click', function (event) {
        speakFunction(event, "GB");
        console.log('GB speaker Icon Clicked');
    });
});

/**
 * Link To Fetch Data Stored In the JSON Folder
 */
async function fetchAlphabetsData() {
    let response = await fetch('assets/js/json/alphabets-data.json');
    alphabets = await response.json();
    generateAlphabet();
}

/**
 * Generate Random alphabets from A to Z
 */
let randomAlphabets = function () {
    return Math.floor(Math.random() * alphabets.length);
};

/**
 * Generate Alphabet Funtion after data has been fetched from JSON file
 * with pictural represnetation and word
 */
let alphabetsArray = [];
let generateAlphabet = function () {
    if (alphabets.length === 0) {
        alphabets.push.apply(alphabets, alphabetsArray);
    }

    let alphabetLetter = document.getElementsByClassName('letter')[0];
    let alphabetImg = document.getElementsByClassName('image')[0];
    let alphabetImageSpellingWord = document.getElementsByClassName('image-spelling-word')[0];

    let randomIndex = randomAlphabets();

    alphabetLetter.innerText = alphabets[randomIndex].letter;
    alphabetImg.innerHTML = `<img src = ${alphabets[randomIndex].img} alt = ${alphabets[randomIndex].imgAlt}>`;
    alphabetImageSpellingWord.innerText = alphabets[randomIndex].imageSpellingWord;

    currentWord = alphabets[randomIndex].imageSpellingWord;
};

/**
 * Add Accents Audio to Click Speaker Icon
 */

function speakFunction(event, lang) {
    event.stopPropagation();
    let say = new SpeechSynthesisUtterance();
    say.lang = `en-${lang}`;
    say.text = currentWord.replace('/', 'or');
    say.pitch = 0.5;
    speechSynthesis.speak(say);
}