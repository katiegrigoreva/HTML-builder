const fs = require('node:fs');
const path = require('node:path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
readStream.on('data', (data) => {
  console.log(data.toString());
});
