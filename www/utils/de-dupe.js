// The purpose of this CLI tool is to go through the images folder, find duplicate files with different names, and list the duplicates.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const chalk = require('chalk');
let sizesMap = {};
let imagesDir = path.join(__dirname, '../src/public/img');
let dirData = fs.readdirSync(imagesDir);
for (const file of dirData) {
    let stat = fs.statSync(path.join(imagesDir, file));
    if (stat.isFile()) {
        sizesMap[file] = stat.size;
    }
}
let foundDuplicates = [];
for (const key of Object.getOwnPropertyNames(sizesMap)) {
    let isDuplicate = foundDuplicates.filter(val => {
        return val.includes(key);
    });
    if (isDuplicate && isDuplicate[0] && isDuplicate[0][0]) {
        continue; // already marked as duplicate
    }
    let currentSize = sizesMap[key];
    let possibleDuplicates = [];
    for (const otherKey of Object.getOwnPropertyNames(sizesMap)) {
        if (otherKey === key) {
            continue;
        }
        if (sizesMap[otherKey] === currentSize) {
            // Possible duplicate
            possibleDuplicates.push(otherKey);
        }
    }
    let actualDuplicates = [];
    if (possibleDuplicates.length > 0) {
        let fileToRead = path.join(imagesDir, key);
        let currentFile = fs.readFileSync(fileToRead);
        for (const dupe of possibleDuplicates) {
            let newFileToRead = path.join(imagesDir, dupe);
            let buff = fs.readFileSync(newFileToRead);
            try {
                let doEqual = crypto.timingSafeEqual(currentFile, buff);
                if (doEqual) {
                    actualDuplicates.push(dupe);
                }
            } catch (err) {
                // Not duplicates
            }
        }
    }
    if (actualDuplicates.length > 0) {
        actualDuplicates.push(key);
        foundDuplicates.push(actualDuplicates);
    }
}
if (foundDuplicates.length === 0) {
    console.log('\n' +
        chalk.green('No Duplicates!'),
        'No duplicate images were found in this directory:\n\n' +
        chalk.bold(chalk.black(imagesDir)) + '\n'
    );
} else {
    console.log('\n' +
        chalk.bold(
            'Found',
            chalk.red((foundDuplicates.length).toString()),
            'duplicate' + (foundDuplicates.length > 1 ? 's' : '') + ':\n'
        )
    );
    for (const dupe of foundDuplicates) {
        let actual = dupe[dupe.length - 1];
        console.log(chalk.yellow(actual), 'has', chalk.red(dupe.length - 1), 'duplicate' + (dupe.length > 2 ? 's' : '') + ':');
        for (const realDupe of dupe.slice(0, dupe.length - 1)) {
            console.log('    -', realDupe);
        }
        console.log('\n\nBase Directory: ' + imagesDir + '\n');
    }
}