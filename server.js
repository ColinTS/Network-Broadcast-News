/*jshint esversion: 6*/
const net = require('net');

//stores people connected to chat
var people = [];

//stores usernames
var usernames = [];

//create server
const server = net.createServer((connection) => {
  console.log('New connection');

  //push users into array
  people.push(connection);

  //Get username
  connection.write('What is your @name?');

  //RECEIVING MESSAGES FROM USERS
  connection.on('data', (chunk) => {

    if(chunk.toString().indexOf('@') === 0){
      if(usernames.indexOf(chunk.toString().replace(/(\r\n|\n|\r)/gm,"")) !== -1
        || chunk.toString().replace(/(\r\n|\n|\r)/gm,"") === '@admin'){
        connection.write('That name already exists.');
        return;
      }
      else {
        connection.name = chunk.toString().replace(/(\r\n|\n|\r)/gm,"");
        usernames.push(chunk.toString().replace(/(\r\n|\n|\r)/gm,""));
        console.log(`${connection.name} has joined the channel`);
      }
      }

    //sends user's message to everyone
    people.forEach(function(c, i) {
      //prevents sender's messages from being sent to themselves
      if(c === connection) {
        return;
      }
      //prevents users from sending messages without setting a username.
      if (connection.name === undefined){
        connection.write('Start your name with an @');
        return;
      }
      if(chunk.toString().indexOf('@') === 0){
        c.write(`${connection.name} has joined the channel`);
      }
       else {
        c.write(`${connection.name}: ${chunk.toString()}`);
        console.log(`${connection.name}: ${chunk.toString()}`);
      }

    });
  });

  //ALLOWS ADMIN TO SEND MESSAGES
  process.stdin.on('data', (chunk) => {
    people.forEach(function(c) {
      if(c === connection) {
        return;
      }
       c.write(`[KAHUNA]: ${chunk.toString()}`);
    });
  });

});

//listen to client
server.listen(6969, '0.0.0.0', () => {
  console.log('server started on port 6969');
});