/*jshint esversion: 6*/
const net = require('net');

//connect client to server
const client = net.createConnection({port: 6969}, () => {

  //write messages to server
  process.stdin.on('data', (chunk) => {
    client.write(chunk);
  });

  //receive messages from server
  client.on('data', (chunk) => {
    console.log(chunk.toString());
  });

});