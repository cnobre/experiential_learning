// npm install --save jimp
// run npm install if running the code for the first time. 
const Jimp = require('jimp');
const fs = require('fs');
 
// // User-Defined Function to read the images
// async function main() {
//     const image = await Jimp.read(
// 'vlat_annotations/ACQ1 - Annotate/R_24f9i6OOOaJR6Vr_signature.png');
//     // rotate Function having rotation as 55
//     image.resize(860,816)
//         .write('resize2.png');
// }
 
// main();
// console.log("Image Processing Completed");



async function imageOverlay(image) { // Function name is same as of file

let fileName = image.split('/')[2];

// if file is not a signature.png exit
if (!fileName || !fileName.includes('signature'))
    return;

let question = image.split('/')[1].split('-')[0];
let chartType = question.split('Q')[0];



// If chart type has less than two letters (a trial) exit
if (chartType.length < 2)
    return;

// console.log(fileName)
// Reading annotation Image
// console.log(image.trim())
let annotation = await Jimp.read(image.trim());
annotation = annotation.resize(860,816); // Resizing annotation image
  
// // Reading original chart
// console.log(chartType)
console.log('chart', chartType)

 let chart = await Jimp.read('charts/' + chartType + '.png');
   annotation = await annotation
   chart.composite(annotation, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 1
   })
   await chart.writeAsync('composite_annotations/' + question + '/'+fileName);
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
files.map(file=>{
    imageOverlay(file);
})
// console.log(filesInTheFolder)

// Calling this function using async

// console.log("Image is processed successfully");