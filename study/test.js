const Jimp = require('jimp');
const fs = require('fs').promises;
const csv = require('fast-csv');
const ObjectsToCsv = require('objects-to-csv');
const d3 = require('d3')
const d3Dsv = require('d3-dsv');

//function to test if question is a 'core VLAT question' , 
function testQuestionID(input) {
    let regex = /.Q[0-9]_?[0-9]?$/;
    return regex.test(input);
}


let answerKeyFile = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTV7q_PgMiU-Ga7oLNm7kyfDyejGg1YTn3vexGKCsXBKs-bkiS4NqXBUl54p1h078IHZcC4QIJ6iq-H/pub?gid=1494114716&single=true&output=csv'

    async function loadCSV(path) {
        const data = await fs.readFile(path, 'utf8');
        return d3Dsv.csvParse(data);
    }

async function loadCSVFiles() {
    try {
        let files = await Promise.all([
            loadCSV("./complete/codes.csv"),
            d3.csv(answerKeyFile),
            loadCSV("./complete/scores.csv")
        ]);

        let codes = files[0];
        let answerKey = files[1];
        let scores = files[2];

        console.log("Codes Data:", codes);
        // console.log("Answers Data:", answerKey);
        // console.log("Scores Data:", scores);

        // You can now work with the data from the three files

    } catch (error) {
        console.error("Error loading CSV files:", error);
    }
}

loadCSVFiles();