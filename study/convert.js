const xlsx = require('xlsx');
const fs = require('fs');

function convertXLSXToCSV(inputPath, outputPath) {
    const workbook = xlsx.readFile(inputPath);
    const sheetNameList = workbook.SheetNames;
    const csv = xlsx.utils.sheet_to_csv(workbook.Sheets[sheetNameList[0]]);
    // add column header for the first col 
    fs.writeFileSync(outputPath, 'participant'+csv);
}

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
    console.error("Usage: node convert.js <inputPath> <outputPath>");
    process.exit(1);
}

convertXLSXToCSV(inputPath, outputPath);