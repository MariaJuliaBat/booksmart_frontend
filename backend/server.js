// backend/server.js

import express from 'express';
import cors from 'cors';
import bookRoutes from './src/routes/book.routes.js';

const app = express();
const port = 3001;

// Middlewares
app.use(express.json());
app.use(cors()); // Permite a comunicação com o frontend

// Rotas
app.use('/api', bookRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log('✅ Backend rodando com sintaxe moderna (ESM) em http://localhost:3001');
});