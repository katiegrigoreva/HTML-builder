const fs = require('node:fs');
const path = require('node:path');
const { stdin: input, stdout: output } = require('node:process');
const readline = require('node:readline');
const rl = readline.createInterface({ input, output });
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const textOutput = function (text) {
  rl.setPrompt(text);
  rl.prompt();
};

textOutput(
  'Hello! Hope you are doing well today!\nPlease tell me your name and give some helpful advice about learning JS:\n',
);

rl.on('line', (answer) => {
  if (answer.toString().trim() === 'exit') {
    textOutput('Ok, bye! Have a nice day!');
    rl.close();
  } else {
    textOutput('Something else? (or use "exit" to finish)\n');
    writeStream.write(`${answer}\n`);
  }
});
rl.on('SIGINT', () => {
  textOutput('Ok, bye! Have a nice day!');
  rl.close();
});
