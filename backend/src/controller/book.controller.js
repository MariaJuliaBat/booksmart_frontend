
import { books } from '../model/book.model.js';

// Rota para listar todos os livros
export const getBooks = (req, res) => {
  console.log('Requisição recebida para listar todos os livros.');
  return res.status(200).send(books);
};

// Rota para buscar um livro por ID
export const getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Requisição recebida para buscar livro com ID: ${id}`);
  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).send({ message: 'Livro não encontrado pelo ID.' });
  }

  return res.status(200).send(book);
};


export const searchBookByName = (req, res) => {
  const query = req.params.nome.toLowerCase(); 
  console.log(`Requisição recebida para buscar por: "${query}"`);
  
  const filteredBooks = books.filter((book) => {
    const bookName = book.nome.toLowerCase();
    const authorName = book.autor.toLowerCase();

    return bookName.includes(query) || authorName.includes(query);
  });

  if (filteredBooks.length === 0) {
    return res.status(404).send({ message: 'Nenhum livro ou autor encontrado com esse termo.' });
  }

  return res.status(200).send(filteredBooks);
};