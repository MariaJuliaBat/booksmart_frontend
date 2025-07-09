import express from 'express';
import { getBooks, getBookById, searchBookByName } from '../controller/book.controller.js';

const router = express.Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.get('/books/search/:nome', searchBookByName);

export default router;