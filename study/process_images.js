// npm install --save jimp
// run npm install if running the code for the first time. 
const Jimp = require('jimp');
const fs = require('fs');
 
async function imageOverlay(image) { 

//e.g. image =  'vlat_annotations/SB100Q3 - annotate/R_bQabCwyyuq5L81b_signature.png'

let fileName = image.split('/')[2];
// e.g. fileName = 'R_bQabCwyyuq5L81b_signature.png'


// if file is not a signature.png exit
if (!fileName || !fileName.includes('signature'))
    return;

let id = fileName.split('_signature')[0];
// e.g id = 'R_bQabCwyyuq5L81b'


let question = image.split('/')[1].split('-')[0];
//e.g question = SB100Q3

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

let width =  chart.bitmap.width; //  width of the image
let height  = chart.bitmap.height; // height of the image

annotation = annotation.resize(width,height); // Resizing annotation image to match the underlying chart

    // console.log(question, width,height)

//    annotation = await annotation
   chart.composite(annotation, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 1
   })
   await chart.writeAsync('composite_annotations/' + question + '_'+id + '.png');
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

const files = getFiles('vlat_annotations');
// console.log(files)
files.map(file=>{
    imageOverlay(file);
})
// // console.log(filesInTheFolder)

// Calling this function using async

// console.log("Image is processed successfully");