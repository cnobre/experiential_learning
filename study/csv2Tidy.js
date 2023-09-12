// npm install --save jimp
// npm install --save d3-node

// run npm install if running the code for the first time. 
const fs = require('fs');
const csv = require('fast-csv');
const ObjectsToCsv = require('objects-to-csv');
const d3 = require('d3')

//function to test if question is a 'core VLAT question' , 
function testQuestionID(input) {
    let regex = /.Q[0-9]_?[0-9]?$/;
    return regex.test(input);
}


//files needed: answer key, accuracy scores, and qual tags; 

//object to store answer key
let answers = {};
let answerKeyFile = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTV7q_PgMiU-Ga7oLNm7kyfDyejGg1YTn3vexGKCsXBKs-bkiS4NqXBUl54p1h078IHZcC4QIJ6iq-H/pub?gid=1494114716&single=true&output=csv'

d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vTV7q_PgMiU-Ga7oLNm7kyfDyejGg1YTn3vexGKCsXBKs-bkiS4NqXBUl54p1h078IHZcC4QIJ6iq-H/pub?gid=1494114716&single=true&output=csv')
// d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vTV7q_PgMiU-Ga7oLNm7kyfDyejGg1YTn3vexGKCsXBKs-bkiS4NqXBUl54p1h078IHZcC4QIJ6iq-H/pub?gid=0&single=true&output=csv')
    .then(data => {
        data.map(d => {
            answers[d['Question ID']] = d
        })
        console.log(data);
    })

// async function loadCSVFiles() {
//     try {
//         let files = await Promise.all([
//             d3.csv("complete/codes.csv"),
//             // d3.csv(answerKeyFile),
//             d3.csv("complete/scores.csv")
//         ]);

//         let codes = files[0];
//         let answerKey = files[1];
//         // let scores = files[2];

//         console.log("Codes Data:", codes);
//         console.log("Answers Data:", answerKey);
//         // console.log("Scores Data:", scores);

//         // You can now work with the data from the three files

//     } catch (error) {
//         console.error("Error loading CSV files:", error);
//     }
// }

// loadCSVFiles();




