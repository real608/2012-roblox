// The purpose of this CLI tool is to confirm that all packages being require()'d are in package.json
const fs = require('fs-extra');
const path = require('path');
const klawSync = require('klaw-sync')
const chalk = require('chalk').default;

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')).toString());
let allPackages = Object.getOwnPropertyNames(pkg.dependencies);

const exists = (packageName) => {
    if (require("module").builtinModules.includes(packageName)) {
        return true;
    }
    return allPackages.includes(packageName);
}

/**
 * Process a file
 * @param {string} file 
 */
const handleFile = async (file) => {
    if (file.slice(file.length - 3) !== '.js') {
        return { file, didNotExist: [] };
    }
    let contentBuff = await fs.readFile(file);
    let contentStr = contentBuff.toString();
    let requires = contentStr.match(/require\(("|'|`).+?("|'|`)\)/g);
    if (!requires) {
        return { file, didNotExist: [] };
    }
    let didNotExist = [];
    for (const match of requires) {
        // console.log(match);
        let pkgName = match.slice('require(q'.length);
        pkgName = pkgName.slice(0, pkgName.length - 'q)'.length);
        if (pkgName.slice(0, 1) !== '.') {
            if (!exists(pkgName)) {
                didNotExist.push(
                    pkgName,
                );
            }
        }
    }
    return {
        didNotExist,
        file,
    };
}

let allPromises = [];
for (const pt of klawSync(path.join(__dirname, '../www/dist/'))) {
    allPromises.push(handleFile(pt.path));
}
Promise.all(allPromises).then((results) => {
    console.log(chalk.grey('-'.repeat(process.stdout.columns / 2)));
    let missing = [];
    for (const result of results) {
        if (!result) {
            continue;
        }
        if (result.didNotExist.length >= 1) {
            console.log(result.file, 'is ' + chalk.red('missing') + ':');
            for (const res of result.didNotExist) {
                console.log(' - ' + chalk.yellow(res));
                if (!missing.includes(res)) {
                    missing.push(res);
                }
            }
            console.log('');
        }
    }
    if (missing.length === 0) {
        console.log(chalk.green('No requires seem to be missing.'));
    } else {
        console.log(chalk.red(missing.length.toString()), 'packages are missing.');
        console.log('Assuming there are no typos, you can run this to install the missing packages:\n' + chalk.bgBlack(chalk.whiteBright('npm i ' + missing.join(' '))));
    }
    console.log(chalk.grey('-'.repeat(process.stdout.columns / 2)));
    process.exit();
}).catch(err => {
    console.error(err);
    process.exit(1);
})