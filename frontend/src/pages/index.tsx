import { useState } from 'react';
import { FiSearch, FiBookOpen } from 'react-icons/fi';
import { BookApi } from '../hooks/BookApi';
import { IBook } from '../types';
import BookCard from '../components/BookCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const performSearch = async (searchFn: () => Promise<IBook[] | IBook>) => {
    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);
    setResults([]);
    try {
      const data = await searchFn();
      setResults(Array.isArray(data) ? data : [data]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const searchFn = !isNaN(Number(query))
      ? () => BookApi.getBookById(query)
      : () => BookApi.searchBooksByName(query);
    performSearch(searchFn);
  };

  const handleGetAllBooks = () => {
    performSearch(BookApi.getAllBooks);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow">
        <div className="text-center pt-24 pb-20 px-4">
          <h1 className="text-9xl font-extrabold tracking-wide text-slate-900 uppercase drop-shadow-sm">
            Booksmart
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            A sua biblioteca definitiva de livros de matemática.
          </p>

          <form onSubmit={handleFormSubmit} className="mt-12 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busque por título ou ID..."
                className="w-full pl-5 pr-16 py-4 text-lg rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center justify-center w-16 h-full text-gray-600 hover:text-purple-600 rounded-r-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                aria-label="Buscar"
              >
                <FiSearch className="h-6 w-6" />
              </button>
            </div>
          </form>
        </div>

        <div className="pb-36 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            {searchPerformed ? (
              <div>
                {isLoading && (
                  <p className="text-center text-xl animate-pulse text-slate-600">Buscando...</p>
                )}
                {error && (
                  <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg max-w-md mx-auto">
                    <strong>Erro:</strong> {error}
                  </div>
                )}
                {!isLoading && !error && (
                  results.length > 0 ? (
                    <div className="w-full overflow-visible animate-fadeIn">
                      <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-700">Resultados da Busca</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {results.map((book) => (
                          <BookCard key={book.id} book={book} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center bg-white p-8 rounded-lg max-w-md mx-auto shadow-sm border">
                      <p className="font-semibold text-slate-700 text-lg">Nenhum livro encontrado.</p>
                      <p className="text-slate-500 mt-2">Tente buscar por outro termo ou listar todos os livros.</p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="text-center border-t-2 border-gray-200 pt-16">
                <h2 className="text-3xl font-bold text-slate-700 mb-5">Explore o Acervo Completo</h2>
              </div>
            )}
          </div>

          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <button
              onClick={handleGetAllBooks}
              className="inline-flex items-center gap-3 px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <FiBookOpen /> Listar Todos os Livros
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}