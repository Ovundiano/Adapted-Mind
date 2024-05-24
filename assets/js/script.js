// Wait for the DOM to finish loading before running the game

let alphabet = document.getElementsByClassName("alphabet");
let btnVoiceUs = document.getElementById("voice__option--US");
let btnVoiceGb = document.getElementById("voice__option--GB");
let currentWord;
let temporaryAlphabetsArray = [];
let flashalphabets;
let nextAlphabet = document.getElementById("alphabet__next");