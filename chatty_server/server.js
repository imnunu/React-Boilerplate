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
  wss.broadcast(JSON.stringify({
    type: 'usersOnline',
    usersOnline: wss.clients.size
  }))
 
  ws.on('message', (message) => {
    const newMessage = JSON.parse(message);

    switch(newMessage.type) {
      case 'postNotification' :
        wss.broadcast(JSON.stringify({
          type: 'incomingNotification',
          id: uuid(),
          content: newMessage.content
        }));
        break;
      
      case 'postMessage' :
        wss.broadcast(JSON.stringify({
          type: 'incomingMessage',
          id: uuid(),
          username: newMessage.username,
          content: newMessage.content
        }));
        break;
    }
    
  });



  ws.on('close', () => {
    console.log('disconnected');
    wss.broadcast(JSON.stringify({
    type: 'usersOnline',
    usersOnline: wss.clients.size
  }))
  });
});




  server.listen(3001, function () {
  console.log('listening!');
});

