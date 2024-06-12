const WebSocket = require('ws');
const readline = require('readline');
require('dotenv').config();//環境變數

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ws = new WebSocket(process.env["SERVER_IP"]);

ws.on('open', () => {
  console.log('Connected to the server');
  rl.question('Enter your name: ', (name) => {
    ws.send(`${name} joined the chat`);
    rl.setPrompt(`${name}: `);
    rl.prompt();
    rl.on('line', (message) => {
      ws.send(`${name}: ${message}`);
      rl.prompt();
    });
  });
});

ws.on('message', (message) => {
  console.log(`\n${message}`);
  rl.prompt();
});

ws.on('close', () => {
  console.log('Disconnected from the server');
  process.exit(0);
});

ws.on('error', (error) => {
  console.error(`WebSocket error: ${error}`);
});
