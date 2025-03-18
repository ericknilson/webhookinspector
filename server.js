/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const express = require('express');
const next = require('next');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

const port = process.env.WEBSOCKET_SERVER_PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  
  // Usar bodyParser para ler o corpo das requisições
  server.use(bodyParser.json());

  // Endpoint para receber os webhooks
  server.post('/api/webhook', (req, res) => {
    const data = req.body;

    // Enviar os dados para todos os clients websocket conectados
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
    return res.status(200).send('Webhook recebido');
  });

  // Todas as outras rotas serão tratadas pelo Next.js
  server.all('*', (req, res) => handle(req, res));

  // Criar o servidor HTTP e integrar o websocket
  const httpServer = http.createServer(server);

  // Cria o servidor WebSocket na rota /ws
  const wss = new WebSocket.Server({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('Cliente websocket conectado');
    ws.on('message', (message) => {
      console.log(`Mensagem do client: ${message}`);
      // Aqui, você pode implementar autenticação ou lógica adicional se necessário
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Servidor rodando em http://localhost:${port}`);
  });
});
