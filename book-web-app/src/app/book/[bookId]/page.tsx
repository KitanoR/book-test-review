import BookForm from "@/components/book/BookForm";
import { getBook } from "@/helper/book-requests";
import { Heading, Separator } from "@chakra-ui/react";

interface BookParams {
  bookId: number;
}

const BookEditPage = async ({ params }: { params: Promise<BookParams> }) => {
  const { bookId } = await params;
  const book = await getBook(bookId);

  return (
    <>
      <Heading>Edit Books Interview</Heading>
      <Separator mb={5}/>
      <BookForm initialValues={book} isEditForm bookId={bookId}/>
    </>
  );
}

export default BookEditPage;