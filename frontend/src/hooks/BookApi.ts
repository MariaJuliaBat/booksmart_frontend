// src/hooks/BookApi.ts
import { IBook } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

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

export const BookApi = {
  getAllBooks: (): Promise<IBook[]> => fetchApi(`${API_BASE_URL}/books`),

  // CORREÇÃO: A função agora é 'async' e usa 'await' para esperar o resultado da API.
  getBookById: async (id: string): Promise<IBook> => {
    const book = await fetchApi(`${API_BASE_URL}/books/${id}`);
    // A checagem de "não encontrado" (erro 404) já é tratada dentro de 'fetchApi'.
    // A checagem anterior aqui era um bug, pois 'book' era uma Promise, não o objeto real.
    return book;
  },
  
  searchBooksByName: (name: string): Promise<IBook[]> => {
    return fetchApi(`${API_BASE_URL}/books/search/${encodeURIComponent(name)}`);
  },
};