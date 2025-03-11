import BookForm from "@/components/book/BookForm";
import { Heading, Separator } from "@chakra-ui/react";

const BookCreatePage = () => {
  return (
    <>
      <Heading>Create a new Book</Heading>
      <Separator mb={5}/>
      <BookForm />
    </>
  );
}

export default BookCreatePage;