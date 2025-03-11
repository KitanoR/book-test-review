import { Button, EmptyState, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { LuBookX } from "react-icons/lu";

const Empty = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <LuBookX />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Start adding books</EmptyState.Title>
          <EmptyState.Description>
            Add a new Book to get started
          </EmptyState.Description>
        </VStack>
        <Link href="/book/create">
          <Button>Create new book</Button>
        </Link>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export default Empty;