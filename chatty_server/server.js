// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
// const WebSocket = require('ws');
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};


wss.on('connection', (ws) => {
  console.log('Client connected');
 
  ws.on('message', (data) => {
    const newMessage = JSON.parse(data);
    newMessage.id = uuid();

    switch(newMessage.type) {
      case 'postNotification' :
        newMessage.type = 'incomingNotification';
        break;
      
      case 'postMessage' :
        newMessage.type = 'incomingMessage';
        break
    }
    wss.broadcast(JSON.stringify(newMessage));
  });



  ws.on('close', () => {
    console.log('disconnected');
  });
});




  server.listen(3001, function () {
  console.log('listening!');
});

