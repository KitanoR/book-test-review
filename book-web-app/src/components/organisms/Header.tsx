import { Avatar, Box, Flex, IconButton, Wrap } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";

const Header = () => {
  return (
    <Box>
      <Flex justify="space-between" align="center" p={4}>
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={18}
          priority
        />
        <Wrap gap={3}>
          <Link href="/book/home">Books</Link>
          <Link href="/">About</Link>
        </Wrap>
        <Flex>
          <Avatar.Root>
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>

          <IconButton aria-label="Close session" ml={2} variant="outline">
            <LuLogOut />
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
