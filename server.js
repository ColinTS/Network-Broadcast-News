/*jshint esversion: 6*/
const net = require('net');

//stores people in chat
var people = [];

//stores usernames
var username = [];

//create server
const server = net.createServer((connection) => {
  console.log('New connection');

  //push users into array
  people.push(connection);

  //Get username
  connection.write('What is your @name?');

  //RECEIVING MESSAGES FROM PEOPLE
  connection.on('data', (chunk) => {

    console.log(chunk.toString());

    if(chunk.toString().indexOf('@') === 0){
        username.push(chunk.toString());
      }


    //sends person's message to everyone
    people.forEach(function(c, i) {
      //prevents sender's messages from being sent to themselves
      if(c === connection) {
        return;
      }
       if(username.indexOf(`@${chunk.toString()}\n`) === -1){
        connection.write('Please begin your username with @');
        console.log(username.indexOf(`@${chunk.toString()}\n`));
        console.log(username);
        return;
      } else {
        c.write(`${username[i]}${chunk.toString()}`);
    }

    });
  });

  //ALLOWS ADMIN TO SEND MESSAGES
  process.stdin.on('data', (chunk) => {
    people.forEach(function(c) {
      if(c === connection) {
        return;
      }
       c.write(`[BIG KAHUNA]${chunk.toString()}`);
    });
  });

});

//listen to client
server.listen(6969, '0.0.0.0', () => {
  console.log('server started on port 6969');
});