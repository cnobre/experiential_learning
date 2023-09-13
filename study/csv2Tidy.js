const Jimp = require('jimp');
const fsPromise = require('fs').promises;
const fs = require('fs')
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
    const data = await fsPromise.readFile(path, 'utf8');
    return d3Dsv.csvParse(data);
}
//function to convert objects into csv for Tidy
function convertToCSV(data) {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(row => {
        return Object.values(row).map(value => {
            // Handle commas in data and encapsulate the data in quotes
            if (typeof value === "string" && value.includes(',')) {
                return `"${value}"`;
            }
            return value;
        }).join(',');
    });
    return header + '\n' + rows.join('\n');
}

//function to export tidy format
function saveToFile(filename, data) {
    const csv = convertToCSV(data);
    fs.writeFileSync('complete/'+filename, csv);
    console.log(`Data saved to ${filename}`);
}


function getStringAfterUnderscore(str) {
    const underscoreIndex = str.indexOf('_');
    if (underscoreIndex === -1) {
        return '';  // No underscore found in the string
    }
    return str.substr(underscoreIndex + 1);
}

let tidyData = [];
async function loadCSVFiles() {
    try {
        let files = await Promise.all([
            loadCSV("./complete/codes.csv"),
            d3.csv(answerKeyFile),
            loadCSV("./complete/scores.csv"),
            loadCSV("./complete/qualtrics.csv")
        ]);

        //only keep entries for sketches that got at least one code;
        let codes = files[0].filter(c => Number(c.SUM) > 0);
        //remove last line; 
        codes.pop();
        let answerKey = files[1];
        let scores = files[2];
        let results = files[3];

 

        // console.log("Codes Data:", codes[0]);
        // console.log("Answers Data:", answerKey [0]);
        // console.log("Scores Data:", scores[0]);
        // console.log("Survey Data:", results[2]);

        //remove the first two rows of the survey data. 

        // PSQ1: 'How old are you?',
        // PSQ2: 'Which gender do you most identify with?',
        // PSQ3: 'What is the status of your vision? - Selected Choice',
        // PSQ3_3_TEXT: 'What is the status of your vision? - Other, please specify below - Text',
        // PSQ4: 'What is your field of study or your job area?',
        // PSQ5: 'How would you rate yourself in your familiarity with data visualizations?',
        // PSQ6: 'What is the highest level of school you have completed or the highest degree you have received? - Selected Choice',
        // PSQ6_8_TEXT: 'What is the highest level of school you have completed or the highest degree you have received? - Other - Text',
        // PSQ7: 'Are you color blind and if so, what type?',

        // Answers Data: {
        //     'Chart Type': 'Area Chart',
        //     'Question ID': 'ACQ1',
        //     'visTask': 'Retrieve Value',
        //     Prompt: 'What was the price of a pound of coffee beans in June 2019? ',
        //     Answer: '0.7112',
        //     'Acceptable range min': '0.7',
        //     'Acceptable range max': '0.72',
        //     Notes: '',
        //     '': ''
        //   }


        //create tidy file with the following cols. 
        //prolific id, age, field of study, visualization familiarity, education, colorblind, questionId, visTask, measure, value
        //measures are: accuracy, time, qual code; 

        //all valid qual codes;
        let allCodes = Object.keys(codes[0]);
        //iterate through codes to parse out respondent id field; 
        codes.map((c, i) => {

            //get rid of entries for codes have a 0 count for that sketch
            allCodes.map(code => {
                if (Number(c[code]) == 0) {
                    delete (c[code])
                }
            })
            c.ResponseId = getStringAfterUnderscore(c.participant);
            c.question = c.participant.split('_')[0]
            let survey_entry = results.filter(r => r.ResponseId == c.ResponseId)[0]
            if (survey_entry) {
                c.PROLIFIC_PID = results.filter(r => r.ResponseId == c.ResponseId)[0].PROLIFIC_PID;
            } else {
                console.log('could not find data for ', i, c.participant, responseId)
            }
            //Delete all codes with a value of 0 for that question/participant combo; 
        })

        console.log(scores.filter(p=>p['Question Column'] == 'HC2Q1' || p['Question Column'] == 'HC2Q2' || p['Question Column'] == 'HC2Q3' ).length , 'HC2Q1 scores')
        //   console.log("Codes Data:", codes[0]);
        //iterate through each row in the survey data to create rows in the csv; 
        results.map(r => {
            // create a base object for tidyData. 
            let d = {
                id: r.PROLIFIC_PID,
                age: r.PSQ1,
                job: r.PSQ4,
                visLiteracy: r.PSQ5,
                education: r.PSQ6,
                colorblind: r.PSQ7,
                measure: '',
                value: ''
            };

            // loop through all the questions this participant answered and create one row per task with the following measures: accuracy, time, code; ; 
            let scoreData = scores.filter(p => p.PROLIFIC_PID == r.PROLIFIC_PID);
            if (scoreData.length == 0){
                console.log('could not find scores for', d)
            }
            // console.log('participant has accuracy scores for ', scoreData.length , 'tasks')
            scoreData.map(s => {
                let qId = s['Question Column'];
                
                let questionInfo = answerKey.filter(ans => ans['Question ID'] == qId)[0];

                let qInfo = {
                    questionId: qId,
                    task: questionInfo.visTask.toLowerCase(),
                    chart: questionInfo['Chart Type'].trim(),
                }
                //push a row for accuracy
                tidyData.push({
                    ...d,
                   ...qInfo,
                    measure: 'accuracy',
                    value: s.Accuracy
                });

                //push a row for time
                tidyData.push({
                    ...d,
                    ...qInfo,
                    measure: 'time',
                    value: s.time
                });
            
                //push a row for each of the codes this task was assigned (if any)
                let codeRows = codes.filter(c => c.PROLIFIC_PID == s.PROLIFIC_PID && c.question == qId);
                codeRows.map(c => {
                    let sketchCodes = Object.keys(c).filter(k => k.includes('>'));
                    sketchCodes.map(qualCode => {
                        tidyData.push({
                            ...d,
                            ...qInfo,
                            measure: 'qualCode',
                            value: qualCode.split('>')[1]
                        });
                    });
                });
            });

            
            
        })

        // console.log('tidyData', tidyData)
        saveToFile('tidy.csv', tidyData);
        // You can now work with the data from the three files

    } catch (error) {
        console.error("Error loading CSV files:", error);
    }
}

loadCSVFiles();