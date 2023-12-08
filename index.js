// General imports
import express from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';

// Apollo imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import {
  ApolloServerPluginDrainHttpServer
} from '@apollo/server/plugin/drainHttpServer';

// Socket.io imports
import { Server } from 'socket.io';

// Application imports
import { dbConnection } from './config/config.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

// Constants
const PORT = process.env.PORT || 4000;

// Create main app
const app = express();
const httpServer = http.createServer(app);
const ioServer = new Server(httpServer);

// ApolloServer constructor
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await apolloServer.start();

// Routes
app.use(express.static('public'));  // Serves the static files
dbConnection();
app.use('/db', cors(), express.json(), expressMiddleware(apolloServer)); // DB endpoint

// Socket.io
ioServer.on('connection', socket => {
  // Al conectarse, hacer console.log y enviar mensaje a todos los clientes
  console.log('New client connected:', socket.id);
  ioServer.emit("dimelotodo", {
    status: "ok",
    text:"Nuevo usuario conectado: " + socket.id
  });

  // Queda a la espera de recibir mensajes para reenviarlos a todos los clientes
  socket.on('dimelotodo', (msg)=> {
    socket.broadcast.emit('dimelotodo', msg);});

  // Al desconectarse, hacer console.log
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Server startup
await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`);