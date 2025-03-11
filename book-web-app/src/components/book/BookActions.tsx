
import { DialogRoot, DialogTrigger, IconButton } from "@chakra-ui/react";
import { LuCookingPot, LuPencil } from "react-icons/lu";
import DialogDelete from "./DialogDelete";
import Link from "next/link";
import { useState } from 'react';
import { deleteBook } from '@/helper/book-requests';
import { toaster } from '../ui/toaster';

interface BookActionsProps {
  title: string;
  bookId: number;
  refreshBooks: () => void;
}

const BookActions = ({ title, bookId, refreshBooks }: BookActionsProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false);

    const onDelete = async () => {
      setLoading(true);
      await deleteBook(bookId);
      toaster.create({
        title: "Book deleted",
        description: `${title} has been deleted successfully`,
        type: "success",
      });
      setLoading(false);
      await refreshBooks();
      
      setOpen(false);
    };

  return (
    <DialogRoot placement="top" open={open} onOpenChange={(e: { open: boolean | ((prevState: boolean) => boolean); }) => setOpen(e.open)}>
      <Link href={`/book/${bookId}`} >
        <IconButton size="sm" color="blue" mr={2} variant="ghost">
          <LuPencil />
        </IconButton>
      </Link>
      <DialogTrigger asChild>
        <IconButton size="sm" color="red" variant="ghost">
          <LuCookingPot />
        </IconButton>
      </DialogTrigger>
      <DialogDelete title={title} onDelete={onDelete} loading={loading} />
    </DialogRoot>
  );
};

export default BookActions;
