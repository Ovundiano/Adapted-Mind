/* jshint esversion:8 */

// Indepth Knowledge on how to write code to generate array of JSON objects in JavaScript gotten from Quora(https://www.quora.com/What-is-the-best-way-to-generate-an-array-of-JSON-objects-dynamically-in-JavaScript#:~:text=There%20are%20several%20ways%20to,jsonArray.) and Idea gotten from CI Tutor Support(https://learn.codeinstitute.net/ci_support/diplomainfullstacksoftwarecommoncurriculum/tutor)
// Declaring the JSONArray a Global Variable
let jsonArray = [];
for (let i = 0; i < 26; i++) {
    jsonArray.push({
        "id": i,
        "alphabets": "object " + (i + 1)
    });
}

let alphabets = jsonArray;

// Wait for the DOM to finish loading before running the game
// Add event listeners to button element after getting them
// Coding Kowledge of EventListener() function gotten from Tutorial Lessons of Code Institute(https://learn.codeinstitute.net/courses/course-v1:CodeInstitute+LM101+3/courseware/2d651bf3f23e48aeb9b9218871912b2e/78f3c10a937c4fe09640c7c0098d16bd/)
document.addEventListener('DOMContentLoaded', function () {
    let nextAlphabet = document.getElementById("next-alphabet");

    fetchAlphabets()

    //Click Next Alphabet Button to Get Next Random Alphabet
    nextAlphabet.addEventListener('click', function () {
        generateAlphabet();
    });

    //Click Enter Key to Get Next Random Alphabet
    nextAlphabet.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            generateAlphabet();
        }
    });

    //Click Speaker Icon to Listen To Accents Audio
    //Idea of speakFunction () code gotten from flash_cards(https://github.com/IuliiaKonovalova/flash_cards/blob/main/assets/js/cards.js) and indepth knowledge gotten from mdn web docs(https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak)
    let btnAccentsUs = document.getElementById("accents-US");
    let btnAccentsGb = document.getElementById("accents-GB");

    btnAccentsUs.addEventListener('click', function (event) {
        speakFunction(event, "US");
    });

    btnAccentsGb.addEventListener('click', function (event) {
        speakFunction(event, "GB");
    });
});

/**
 * Link To Fetch Alphabets Stored In the JSONArray
 */
// Indepth knowledge of fetch() function gotten from geeksforgeeks(https://www.geeksforgeeks.org/how-to-use-the-javascript-fetch-api-to-get-data/?ref=ml_lbp)
// Idea of JSON data storage file gotten from flash_cards(https://github.com/IuliiaKonovalova/flash_cards/blob/main/assets/js/cards.js) and indepth knowledge gotten from w3schools(https://www.w3schools.com/js/js_json.asp)
// Indepth knowledge of Async() Function gotten from freeCodeCamp(https://www.freecodecamp.org/news/asynchronous-programming-in-javascript/#:~:text=In%20summary%2C%20asynchronous%20programming%20is,async%2Fawait%2C%20and%20promises.)
async function fetchAlphabets() {
    let response = await fetch('assets/js/json/alphabets-data.json');
    alphabets = await response.json();
    generateAlphabet();
}

/**
 * Generate Random alphabets from A to Z
 */
//Indepth Knowledge on randomAlphabets() Function gotten from CI Tutor Support(https://learn.codeinstitute.net/ci_support/diplomainfullstacksoftwarecommoncurriculum/tutor)
function randomAlphabets() {
    return Math.floor(Math.random() * alphabets.length);
};

/**
 * Generate Alphabet() Funtion after alphabet has been fetched from JSON file
 * with it's corresponding pictural represnetation and spelling word
 */
function generateAlphabet() {
    let alphabetLetter = document.getElementsByClassName('letter')[0];
    let alphabetImg = document.getElementsByClassName('image')[0];
    let alphabetImageSpellingWord = document.getElementsByClassName('image-spelling-word')[0];

    let randomAlphabet = randomAlphabets();
    alphabetLetter.innerText = alphabets[randomAlphabet].letter;
    alphabetImg.innerHTML = `<img src = ${alphabets[randomAlphabet].img}>`;
    alphabetImageSpellingWord.innerText = alphabets[randomAlphabet].imageSpellingWord; 

    alphabetWord = alphabets[randomAlphabet].imageSpellingWord;
}

/**
 * Listen to Audio when Speaker Icons are click
 */
//Indepth Knowledge of SpeechSynthesisUtterance() Function gotten from webplatformcourse(https://webplatformcourse.com/bonus/speech-synthesis-api/#:~:text=The%20SpeechSynthesisUtterance%20object%20available%20on,the%20browser%20should%20read%20aloud.)
function speakFunction(event, lang) {
    event.stopPropagation();
    let say = new SpeechSynthesisUtterance();
    say.lang = `en-${lang}`;
    say.text = alphabetWord.replace('/', 'or');
    say.pitch = 0.5;
    speechSynthesis.speak(say);
}