const fsPromise = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path');
const folderPath = path.join(__dirname, 'styles');
const pathToWrite = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    for (let i = 0; i < files.length; i += 1) {
      fs.stat(path.join(files[i].path, files[i].name), (err, stats) => {
        if (stats.isDirectory() || !files[i].name.includes('.css')) {
          files.splice(i, 1);
        } else if (err) {
          console.log(err);
        }
      });
    }
    fs.access(pathToWrite, (err) => {
      if (err) {
        makeBundle(files)
          .then(() => {})
          .catch(console.error);
      } else {
        fs.unlink(pathToWrite, (err) => {
          if (err) {
            console.log(err);
          }
        });
        makeBundle(files)
          .then(() => {})
          .catch(console.error);
      }
    });
  }
});

const makeBundle = async function (files) {
  for (let file of files) {
    const pathToRead = path.join(folderPath, file.name);
    const writeData = await fsPromise.readFile(pathToRead);
    await fsPromise.writeFile(pathToWrite, writeData, { flag: 'a' });
  }
};
