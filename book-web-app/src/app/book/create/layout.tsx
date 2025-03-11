import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const FormLayout = ({children}: PropsWithChildren) => {
  return (
    <Box maxW={{ base: '98%', md: '800px'}} mx="auto" py="8">
      {children}
    </Box>
  )
}

export default FormLayout;