import { Badge, Box, Table } from "@chakra-ui/react";
import BookActions from "./BookActions";
import { Book } from "@/helper/book-requests";
import Empty from "./Empty";

interface BookTableProps {
  books: Book[];
  refreshBooks: () => void;
}

const DRAFT_STATUS = "draft";

const BookTable = ({ books, refreshBooks }: BookTableProps) => {
  return books.length > 0 ? (
    <Box>
      <Table.Root size="sm" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Book</Table.ColumnHeader>
            <Table.ColumnHeader>Author</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Year</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Status</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {books.map((item) => (
            <Table.Row key={`${item.id}-${item.title}`}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.author.name}</Table.Cell>
              <Table.Cell textAlign="end">{item.year}</Table.Cell>
              <Table.Cell textAlign="end">
                <Badge
                  colorPalette={item.status === DRAFT_STATUS ? "gray" : "green"}
                  variant="solid"
                >
                  {item.status}
                </Badge>
              </Table.Cell>
              <Table.Cell textAlign="end">
                <BookActions title={item.title} bookId={item.id} refreshBooks={refreshBooks} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  ) : (
    <Empty />
  );
};

export default BookTable;
