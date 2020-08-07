const fs = require('fs-extra');
const cp = require('child_process');

try {
    /**
     * @type {string[]}
     */
    let distDir;
    try {
        distDir = fs.readdirSync('./dist/');
    } catch{
        // does not exist, so make it
        fs.mkdirSync('./dist/');
        // re-assign to empty array
        distDir = [];
    }
    // make public dir if not exists
    try {
        fs.readdirSync('./dist/public/')
    } catch {
        fs.mkdirSync('./dist/public/');
    }
    for (const file of distDir) {
        fs.removeSync('./dist/' + file);
    }
    // Copy front-end files
    fs.copySync('./src/public', './dist/public');
    // Views
    fs.copySync('./src/views', './dist/views');
    // Transpile the typescript files
    cp.exec('tsc --build tsconfig.json', async (err, stdout, stderr) => {
        if (err) {
            console.error(err);
        } else if (stderr) {
            console.error(stderr);
        } else {
            // stdout | console.log
            console.log(stdout);
        }
    });
} catch (err) {
    console.error(err);
}
