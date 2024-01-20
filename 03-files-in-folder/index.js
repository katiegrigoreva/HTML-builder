const fsPromise = require('node:fs/promises');
const path = require('node:path');
const folderPath = path.join(__dirname, 'secret-folder');
const files = fsPromise.readdir(folderPath, { withFileTypes: true });

files
  .then((files) => {
    for (let file of files) {
      const stats = fsPromise.stat(path.join(file.path, file.name));
      const fileName = file.name.slice(0, findIndexOfDot(file.name));
      const fileExt = file.name.slice(findIndexOfDot(file.name) + 1);
      stats.then((stats) => {
        if (stats.isFile()) {
          console.log(`${fileName} - ${fileExt} - ${stats.size}`);
        }
      });
    }
  })
  .catch(() => {
    throw new Error('Oops( Something`s gone wrong...');
  });

const findIndexOfDot = function (str) {
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === '.') {
      return i;
    }
  }
};
