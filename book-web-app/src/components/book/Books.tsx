'use client'
import { Book, getBooks } from "@/helper/book-requests";
import BookTable from "./BookTable";
import Search from "./Search";
import { Button } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import Link from "next/link";


interface BooksProps {
  initialData: Book[];
}

const Books = ({ initialData }: BooksProps) => {
  const [books, setBooks] = useState(initialData);

  const handleSearch = async (term: string) => {
    const booksFiltered = await getBooks({ author_name: term });
    setBooks(booksFiltered);
  }

  const refreshBooks = async () => {
    const books = await getBooks();
    setBooks(books);
  }
  return (
    <>
      <Search onChange={handleSearch} />
      <Link href="/book/create">
        <Button size="md" variant="surface" colorPalette="green" my={3}>
          <LuPlus />
          Create Book
        </Button>
      </Link>
      <BookTable books={books} refreshBooks={refreshBooks}/>
    </>
  );
}

export default Books;
