import { WebSocketServer } from 'ws';

let socketServer;

export default function handler(req, res) {
  if (!res.socket.server.wss) {
    console.log('Initialisation du WebSocket Server...');
    socketServer = new WebSocketServer({ server: res.socket.server });

    socketServer.on('connection', (socket) => {
      console.log('Client connecté');

      // Message reçu depuis un client
      socket.on('message', (message) => {
        console.log('Message reçu:', message);
        // Exemple : réagir à des commandes spécifiques
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === 'PING') {
          socket.send(JSON.stringify({ type: 'PONG', message: 'Pong from server' }));
        }
      });

      socket.on('close', () => {
        console.log('Client déconnecté');
      });
    });

    res.socket.server.wss = socketServer;
  }
  res.end();
}

// Fonction pour notifier tous les clients connectés
export function notifyClients(data) {
  if (socketServer) {
    socketServer.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(data));
      }
    });
  }
}
