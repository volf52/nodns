import dgram from 'node:dgram';
// import { Buffer } from 'node:buffer';
import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const client = dgram.createSocket('udp4');
const HOST = '8.8.8.8';
const PORT = 53;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testDataPth = path.join(__dirname, '..', 'test_data', 'query_packet');
console.log(testDataPth);
const qdata = fs.readFileSync(testDataPth);
console.log(qdata.length);

client.on('data', (data) => {
  console.log('Data: ', data);

  process.exit(0);
});

client.on('message', (msg, rinfo) => {
  console.log('Data: ', msg);
  console.log(`From ${rinfo.address}`);

  process.exit(0);
});

client.on('error', (err) => {
  console.error(err || 'Closed the client');
});

client.connect(PORT, HOST, () => {
  console.log('Connected');
  console.log('Sending data...');

  client.send(qdata);

  console.log('Data sent...');
});

const cleanupHandler = () => {
  console.log('Closing client...');
  client.close();

  console.log('Bye Bye!!');
};

// normal close
process.on('exit', cleanupHandler);

// ctrl + c
process.on('SIGINT', cleanupHandler);

// "kill pid" events - like nodemon restart
process.on('SIGUSR1', cleanupHandler);
process.on('SIGUSR2', cleanupHandler);

process.on('uncaughtException', cleanupHandler);
