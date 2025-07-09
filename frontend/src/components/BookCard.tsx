import React from 'react';
import { IBook } from '../types';
import { FiBook, FiUser, FiHash } from 'react-icons/fi';

interface BookCardProps {
  book: IBook;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div
      className="bg-[#F5F7FA] border border-[#E2E8F0] p-4 rounded-lg text-[#1E293B] transition-all duration-300 hover:bg-[#D9E2EC] hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex flex-col h-full min-h-[100px]">
        <h3 className="text-sm font-semibold tracking-tight mb-1 flex items-start gap-2">
          <FiBook className="h-4 w-4 text-[#3E8BFF] mt-0.5 flex-shrink-0" />
          <span>{book.nome}</span>
        </h3>
        <div className="flex-grow text-[#64748B] text-xs">
          <p className="flex items-center gap-1">
            <FiUser className="h-3 w-3" />
            <span>{book.autor}</span>
          </p>
        </div>
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