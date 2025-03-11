import Books from "@/components/book/Books";
import { getBooks } from "@/helper/book-requests";
import { Box, Heading, Separator } from "@chakra-ui/react";


export default async function Home() {
  const books = await getBooks();
  
  return (
    <Box>
      <Heading>Books Interview</Heading>
      <Separator />
      <Books initialData={books}/>
    </Box>
  );
}
