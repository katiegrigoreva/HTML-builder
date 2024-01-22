const fsPromise = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path');
const copyDirPath = path.join(__dirname, 'files-copy');

fs.access(copyDirPath, fs.constants.F_OK, (err) => {
  if (err) {
    makeCopyDir();
  } else {
    clearCopyDir();
    makeCopyDir();
  }
});

const makeCopyDir = function () {
  const copyFolder = fsPromise.mkdir(copyDirPath, {
    recursive: true,
  });
  const files = fsPromise.readdir(path.join(__dirname, 'files'), {
    withFileTypes: true,
  });
  copyFolder.then(() => {
    files.then((files) => {
      for (let file of files) {
        const srcPath = path.join(file.path, file.name);
        const destPath = path.join(__dirname, 'files-copy', file.name);
        fs.copyFile(srcPath, destPath, fs.constants.COPYFILE_FICLONE, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  });
};
const clearCopyDir = function () {
  const copyFiles = fsPromise.readdir(copyDirPath, {
    withFileTypes: true,
  });
  copyFiles.then((copyFiles) => {
    for (let copyFile of copyFiles) {
      fs.unlink(path.join(__dirname, 'files-copy', copyFile.name), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};
