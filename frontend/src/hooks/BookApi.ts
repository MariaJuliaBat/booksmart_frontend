import { IBook } from '../types';

/** A URL base para todas as chamadas à API de livros. */
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * @private
 * @function fetchApi
 * @description 
 * @param {string} url A URL do endpoint.
 * @returns {Promise<any>} Os dados da resposta em JSON.
 * @throws {Error} Lança um erro em caso de falha na requisição ou conexão.
 */
async function fetchApi(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ${response.status} ao realizar a requisição.`);
    }
    return response.json();
  } catch (error: any) {
    console.error('Falha na comunicação com a API:', error);
    throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando e se o CORS está habilitado.');
  }
}

/**
 * @object BookApi
 * @description Agrupa os métodos para interagir com a API de livros.
 */
export const BookApi = {
  /**
   * @method getAllBooks
   * @description Busca todos os livros.
   * @returns {Promise<IBook[]>} Uma lista de todos os livros.
   */
  getAllBooks: (): Promise<IBook[]> => fetchApi(`${API_BASE_URL}/books`),

  /**
   * @method getBookById
   * @description Busca um livro específico pelo ID.
   * @param {string} id O ID do livro.
   * @returns {Promise<IBook>} O livro encontrado.
   */
  getBookById: (id: string): Promise<IBook> => fetchApi(`${API_BASE_URL}/books/${id}`),
  
  /**
   * @method searchBooksByName
   * @description Busca livros pelo nome.
   * @param {string} name O termo de busca.
   * @returns {Promise<IBook[]>} Uma lista de livros que correspondem à busca.
   */
  searchBooksByName: (name: string): Promise<IBook[]> => {
    return fetchApi(`${API_BASE_URL}/books/search/${encodeURIComponent(name)}`);
  },
};