import { useState } from 'react';
import { FiSearch, FiBookOpen } from 'react-icons/fi';
import { BookApi } from '../hooks/BookApi';
import { IBook } from '../types';
import BookCard from '../components/BookCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [idQuery, setIdQuery] = useState('');
  const [nameQuery, setNameQuery] = useState('');

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

  const handleIdSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idQuery.trim()) return;
    performSearch(() => BookApi.getBookById(idQuery));
  };

  const handleNameSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameQuery.trim()) return;
    performSearch(() => BookApi.searchBooksByName(nameQuery));
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

          <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-slate-700 mb-4">Buscar por ID</h2>
              <form onSubmit={handleIdSearchSubmit}>
                <div className="relative">
                  <input
                    type="number"
                    value={idQuery}
                    onChange={(e) => setIdQuery(e.target.value)}
                    placeholder="Digite o ID do livro..."
                    className="w-full pl-4 pr-10 py-2 text-base rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                  />
                  <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-4" aria-label="Buscar por ID">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-slate-700 mb-4">Buscar por Título</h2>
              <form onSubmit={handleNameSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={nameQuery}
                    onChange={(e) => setNameQuery(e.target.value)}
                    placeholder="Digite o título do livro..."
                    className="w-full pl-4 pr-10 py-2 text-base rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                  />
                   <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-4" aria-label="Buscar por Título">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={handleGetAllBooks}
              className="inline-flex items-center gap-3 px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <FiBookOpen /> Listar Todos os Livros
            </button>
          </div>
        </div>
        <div className="pb-36 px-4 sm:px-10 lg:px-8 relative">
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
                      <p className="text-slate-500 mt-2">Tente buscar por outro termo.</p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="text-center border-t-2 border-gray-200 pt-16">
                <h2 className="text-3xl font-bold text-slate-700 mb-5">Faça uma busca para começar</h2>
                <p className="text-slate-500">Utilize uma das opções acima para encontrar livros.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}