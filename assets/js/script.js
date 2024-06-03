/* jshint esversion:8 */

// Wait for the DOM to finish loading before running the game
// Add event listeners to button element after getting them

//Indepth Knowledge on how to write code to generate array of JSON objects in JavaScript gotten from Quora(https://www.quora.com/What-is-the-best-way-to-generate-an-array-of-JSON-objects-dynamically-in-JavaScript#:~:text=There%20are%20several%20ways%20to,jsonArray.)
let jsonArray = [];
for (let i = 0; i < 26; i++) {
    jsonArray.push({
        "id": i,
        "alphabets": "object " + (i + 1)
    });
}
console.log(jsonArray);

let alphabets = jsonArray;
console.log(alphabets);

//Coding Kowledge of EventListener() function gotten from Tutorial Lessons of Code Institute(https://learn.codeinstitute.net/courses/course-v1:CodeInstitute+LM101+3/courseware/2d651bf3f23e48aeb9b9218871912b2e/78f3c10a937c4fe09640c7c0098d16bd/)
document.addEventListener('DOMContentLoaded', function () {
    let nextAlphabet = document.getElementById("next-alphabet");

    //Idea of fetch() function code gotten from flash_cards(https://github.com/IuliiaKonovalova/flash_cards/blob/main/assets/js/cards.js) and indepth knowledge gotten from geeksforgeeks(https://www.geeksforgeeks.org/how-to-use-the-javascript-fetch-api-to-get-data/?ref=ml_lbp)
    fetchAlphabetsData();

    //Click Next Alphabet Button to Get Next Alphabet
    nextAlphabet.addEventListener('click', function () {
        console.log("this is next alphabet = ", nextAlphabet);
        generateAlphabet()
        console.log(current.alphabet);
    });

    //Click Enter Key to Get Next Alphabet
    nextAlphabet.addEventListener('keydown', function (event) {
        console.log("this is next alphabet= ", nextAlphabet);
        if (event.key === 'Enter') {
            generateAlphabet();
        }
        console.log(current.alphabet);
    });

    //Click Speaker Icon to Listen To Accents Audio
    //Idea of speakFunction () code gotten from flash_cards(https://github.com/IuliiaKonovalova/flash_cards/blob/main/assets/js/cards.js) and indepth knowledge gotten from mdn web docs(https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak)
    let btnAccentsUs = document.getElementById("accents-US");
    let btnAccentsGb = document.getElementById("accents-GB");

    btnAccentsUs.addEventListener('click', function (event) {
        speakFunction(event, "US");
        console.log("US Accent spoken", btnAccentsUs);
    });

    btnAccentsGb.addEventListener('click', function (event) {
        speakFunction(event, "GB");
        console.log("GB Accent spoken", btnAccentsGb);
    });
});

/**
 * Link To Fetch Data Stored In the JSON Folder
 */
//Idea of JSON data storage file gotten from flash_cards(https://github.com/IuliiaKonovalova/flash_cards/blob/main/assets/js/cards.js) and indepth knowledge gotten from w3schools(https://www.w3schools.com/js/js_json.asp)
//Indepth knowledge of Async() Function gotten from freeCodeCamp(https://www.freecodecamp.org/news/asynchronous-programming-in-javascript/#:~:text=In%20summary%2C%20asynchronous%20programming%20is,async%2Fawait%2C%20and%20promises.)
async function fetchAlphabetsData() {
    let response = await fetch('assets/js/json/alphabets-data.json');
    alphabets = await response.json();
    console.log(alphabets)
}

/**
 * Generate Random alphabets from A to Z
 */
let randomAlphabets = Math.floor(Math.random() * alphabets.length);
console.log(randomAlphabets);

/**
 * Generate Alphabet Funtion after data has been fetched from JSON file
 * with pictural represnetation and word
 */
let generateAlphabet = function () {
    if (alphabets.length === 0) {
        console.log(alphabets);
    }

    let alphabetLetter = document.getElementsByClassName('letter')[0];
    

    let alphabetImg = document.getElementsByClassName('image')[0];
    

    let alphabetImageSpellingWord = document.getElementsByClassName('image-spelling-word')[0];
    

    let randomIndex = randomAlphabets;

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