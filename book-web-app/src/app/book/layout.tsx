import Header from "@/components/organisms/Header";
import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const BookLayout = ({children}: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Box maxW={{ base: '98%', md: '75%'}} mx="auto" py="8">
        {children}
      </Box>
    </>
  )
}

export default BookLayout;