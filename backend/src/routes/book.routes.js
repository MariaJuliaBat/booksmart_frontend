// backend/src/routes/book.routes.js

import express from 'express';
// Importa as funções do controller com a nova sintaxe
import { getBooks, getBookById, searchBookByName } from '../controller/book.controller.js';

const router = express.Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.get('/books/search/:nome', searchBookByName);

// Exporta o router com a nova sintaxe
export default router;