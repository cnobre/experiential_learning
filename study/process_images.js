// npm install --save jimp
// npm install --save jimp

// run npm install if running the code for the first time. 
const Jimp = require('jimp');
const fs = require('fs');
const csv = require('fast-csv');
const ObjectsToCsv = require('objects-to-csv');

//function to test if question is a 'core VLAT question' , 
function testQuestionID(input) {
    let regex = /.Q[0-9]_?[0-9]?$/;
    return regex.test(input);
}

let data = []
let objData = []
let questionMap = {};


fs.createReadStream('vlat_pilot_2.csv')

    .pipe(csv.parse({ headers: false }))
    .on('error', error => console.error(error))
    .on('data', row => data.push(row))
    .on('end', () => {
        
        let questionPrompts = data[1];
   
        // console.log(questionPrompts)
        data[0].map((id, i) => {
            if (testQuestionID(id)) {
                //remove _ from question prompt
                let cleanId = id.split('_')[0]
                //bug in qualtrics export, doesn't have the question text for this one since it's a standard library question
                if (cleanId == 'CCQ1')
                    questionPrompts[i] = 'In which state was the unemployment rate the highest?' ;                   
                questionMap[cleanId] = questionPrompts[i].replace(/(\r\n|\n|\r)/gm, "").split('?')[0]
            }
        })
        // console.log(questionMap)

        // console.log(data[2])
        data.splice(1, 2)// remove rows 2 and 3
        let headers = data[0];

        data.map((d, i) => {
            let obj = {}
            if (i > 0) {
                // if (i ==1 ) console.log('d',d)
                d.map((dd, i) => {
                    obj[headers[i]] = dd
                })
                objData.push(obj)
            }

        })
        // console.log(objData.filter(d=>d.ResponseId == 'R_2V3XbGtRx4AsXtW'))
        

        const files = getFiles('vlat_pilot2_annotations');
        // console.log(files)
        // imageOverlay(files[20]);

        files.map((file, i) => {
            imageOverlay(file);
        })
    });


async function imageOverlay(image) {

    //e.g. image =  'vlat_annotations/SB100Q3 - annotate/R_bQabCwyyuq5L81b_signature.png'

    let fileName = image.split('/')[2];
    // e.g. fileName = 'R_bQabCwyyuq5L81b_signature.png'


    // if file is not a signature.png exit
    if (!fileName || !fileName.includes('signature'))
        return;

    let id = fileName.split('_signature')[0];
    // e.g id = 'R_bQabCwyyuq5L81b'

    let question = image.split('/')[1].split('-')[0].trim();
    //e.g question = SB100Q3
    
    
    //look for 'ResponseId' to find participant data 
    let participantData = objData.filter(d=>d['ResponseId'] == id.trim())[0];
    let keys = Object.keys(participantData);
    
    // console.log(question, keys.filter(k=>k.includes(question)))


    let answerKey = keys.filter(k=>k.trim()== question);
    let answer; 
    //question has two parts _1 and _2
    if (answerKey.length == 0){
        answerKey = keys.filter(k=>k.includes(question+'_'));
        answer= answerKey.reduce((accumulator, currentValue) => accumulator + ' / ' + participantData[currentValue], '');
    }else {
        answer = participantData[answerKey[0]];
    }

    // console.log(answerKey, answer)


    let explainKey = keys.filter(k=>k.includes(question) && k.includes('textbox'))
    let explanation = participantData[explainKey];

    // console.log(explainKey,explanation)



   

    let chartType = question.split('Q')[0];
    //e.g chartType = SB100



    // If chart type has less than two letters (a trial) exit
    if (chartType.length < 2)
        return;

    // console.log(fileName)
    // Reading annotation Image
    // console.log(image.trim())
    let annotation = await Jimp.read(image.trim());


    // // Reading original chart
    // console.log(chartType)
    // console.log('chart', chartType)

    let chart = await Jimp.read('charts/' + chartType + '.png');
    let background = await Jimp.read('charts/background.png');

    // let width = chart.bitmap.width; //  width of the image
    // let height = chart.bitmap.height; // height of the image

    let width = 860 //set all images to the same size

    let margin = 120;
    chart = chart.resize(width,Jimp.AUTO);
    let height = chart.bitmap.height; // height of the image


    annotation = annotation.resize(width,height); // Resizing annotation image to match the underlying chart
    background = background.resize(width,height + margin); // Resizing background image to make room for the question prompt, the answer, and the rationale

    //overlay annotation on chart
    chart.composite(annotation, 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 1
    })

    //overlay chart on background
    background.composite(chart, 0, margin, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 1
    })

    //add question prompt to image

    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    // console.log(questionMap[question.trim()])
    let prompt =  question + ": " + questionMap[question.trim()]
    let maxCharacters = 100;
    // console.log(typeof prompt)
    if (prompt){
            background.print(font, 10, 20, prompt.slice(0,maxCharacters))
        if (prompt.length>maxCharacters)
            background.print(font, 10, 40, prompt.slice (maxCharacters))
    } else {
        console.log('no prompt for ', question.trim())
    }

    //add answer and explanation 
    background.print(font, 10, 60, 'response: ' + answer)
    if (explanation){
        background.print(font, 10, 80, 'explanation: ' + explanation.slice(0,maxCharacters))
        if (explanation.length>maxCharacters)
            background.print(font, 10, 100, explanation.slice(maxCharacters))
          
    }
   


    await background.writeAsync('composite_annotations/' + question + '_' + id + '.png');
}


// Recursive function to get files
function getFiles(dir, files = []) {
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    const fileList = fs.readdirSync(dir);
    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        // Check if the current file/directory is a directory using fs.statSync
        if (fs.statSync(name).isDirectory()) {
            // If it is a directory, recursively call the getFiles function with the directory path and the files array
            getFiles(name, files);
        } else {
            // If it is a file, push the full path to the files array
            files.push(name);
            //console.log(name) 
        }
    }
    return files;
}



