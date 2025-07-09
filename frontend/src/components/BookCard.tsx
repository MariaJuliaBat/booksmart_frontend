import React from 'react';
import { IBook } from '../types';
import { FiBook, FiUser, FiHash } from 'react-icons/fi';

/**
 * @interface BookCardProps
 * @description Define as propriedades para o componente BookCard.
 */
interface BookCardProps {
  /** O objeto do livro que contém os detalhes a serem exibidos. */
  book: IBook;
}
/**
 * @component BookCard
 * @description Um componente que renderiza um card com as informações de um único livro.
 * @param {BookCardProps} props As propriedades do componente.
 * @param {IBook} props.book O objeto do livro a ser renderizado no card.
 * @returns {JSX.Element} 
 */
const BookCard = ({ book }: BookCardProps) => {
  return (
    // Container principal do card com estilos de layout, borda e transições.
    <div
      className="bg-[#F5F7FA] border border-[#E2E8F0] p-4 rounded-lg text-[#1E293B] transition-all duration-300 hover:bg-[#D9E2EC] hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex flex-col h-full min-h-[100px]">
        {/* Seção do título do livro. */}
        <h3 className="text-sm font-semibold tracking-tight mb-1 flex items-start gap-2">
          <FiBook className="h-4 w-4 text-[#3E8BFF] mt-0.5 flex-shrink-0" />
          <span>{book.nome}</span>
        </h3>

        {/* Seção do autor do livro, que ocupa o espaço restante. */}
        <div className="flex-grow text-[#64748B] text-xs">
          <p className="flex items-center gap-1">
            <FiUser className="h-3 w-3" />
            <span>{book.autor}</span>
          </p>
        </div>

        {/* Rodapé do card, exibindo o ID do livro. */}
        <div className="mt-2 pt-1 border-t border-[#E2E8F0] text-right">
          <p className="flex items-center justify-end gap-1 text-[11px] text-[#64748B]">
            <FiHash className="h-3 w-3" />
            <span>ID {book.id}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;