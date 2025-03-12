"use client";

import {
  BookRequest,
  createBook,
  getAuthors,
  updateBook,
} from "@/helper/book-requests";
import {
  Stack,
  Field,
  Input,
  Button,
  SelectContent,
  SelectRoot,
  SelectItem,
  SelectTrigger,
  SelectValueText,
  createListCollection,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { CreatableSelect } from "chakra-react-select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toaster } from "../ui/toaster";

export interface BookInputs {
  id?: number;
  title: string;
  author: SelectOption;
  year: number;
  status: string[];
  author_name?: string;
  author_id?: number;
}

export interface SelectOption {
  value: number | string;
  label: string;
  __isNew__?: boolean;
}

const status = [
  { value: "draft", label: "draft" },
  { value: "published", label: "published" },
];

interface BookFormProps {
  initialValues?: BookInputs;
  isEditForm?: boolean;
  bookId?: number;
}

const BookForm = ({
  initialValues,
  bookId,
  isEditForm = false,
}: BookFormProps) => {
  const router = useRouter();
  const [authors, setAuthors] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editAuthorName, setEditAuthorName] = useState<boolean>(false);
  const { handleSubmit, control, watch, setValue, formState: { errors } } = useForm<BookInputs>({
    defaultValues: initialValues
  });
  const selectedAuthor = watch("author");
  const statusCollection = createListCollection({ items: status });

  const loadAuthors = async () => {
    const authorsData = await getAuthors();
    setAuthors(
      authorsData.map((author) => ({ value: author.id, label: author.name }))
    );
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const onSubmit: SubmitHandler<BookInputs> = async (data: BookInputs) => {
    setLoading(true);
    try {
      const authorId = !selectedAuthor?.__isNew__
        ? { author_id: selectedAuthor?.value as number }
        : {};
      const bookData: BookRequest = {
        status: data.status[0],
        author_name: data.author_name || selectedAuthor?.label,
        title: data.title,
        year: data.year,
        ...authorId,
        new_author: selectedAuthor?.__isNew__ || false,
      };

      if (isEditForm && bookId) {
        await updateBook(bookId, bookData);
      } else {
        await createBook(bookData);
      }
      toaster.create({
        title: isEditForm ? "Book edited" : "Book created",
        description: `Book has been ${isEditForm ? "edited" : "created"} successfully`,
        type: "success",
      })
      router.push("/book/home");
    } catch {
      toaster.create({
        title: isEditForm ? "Error editing book" : "Error creating book",
        description: `There was an error ${isEditForm ? 'editing' : 'creating'} the book`,
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleEditAuthor = () => {
    setEditAuthorName(!editAuthorName);
    setValue("author_name", selectedAuthor?.label);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Field.Root orientation="vertical" invalid={!!errors.title}>
          <Field.Label>Title</Field.Label>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <Input {...field} value={field.value ?? ""} placeholder="Book title" />
            )}
          />
          <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root orientation="vertical" invalid={!!errors.year}>
          <Field.Label>Year</Field.Label>
          <Controller
            name="year"
            control={control}
            rules={{ required: "Year is required" }}
            render={({ field }) => (
              <Input {...field} value={field.value ?? ""} placeholder="Year (2020)" />
            )}
          />
          <Field.ErrorText>{errors.year?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root orientation="vertical" invalid={!!errors.status}>
          <Field.Label>Status</Field.Label>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <SelectRoot
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                collection={statusCollection}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusCollection.items.map((status) => (
                    <SelectItem item={status} key={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            )}
          />
          <Field.ErrorText>{errors.status?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root orientation="vertical" invalid={!!errors.author}>
          <Field.Label>Author</Field.Label>
          <Controller
            name="author"
            control={control}
            rules={{ required: "Author is required" }}
            render={({ field }) => (
              <CreatableSelect
                options={authors}
                value={field.value ?? null}
                placeholder="Select or create author"
                onChange={(value) => field.onChange(value)}
                disabled={editAuthorName}
              />
            )}
          />

          {selectedAuthor && !selectedAuthor.__isNew__ && !editAuthorName ? (
            <Button size="sm" variant="outline" onClick={handleEditAuthor}>
              Edit author
            </Button>
          ) : null}
          <Field.ErrorText>{errors.author?.message}</Field.ErrorText>
        </Field.Root>
        {editAuthorName ? (
          <Field.Root orientation="vertical" invalid={!!errors.author_name}>
            <Field.Label>New Author Name</Field.Label>
            <Controller
              name="author_name"
              control={control}
              rules={{ required: "Author name is required" }}
              render={({ field }) => (
                <Input
                {...field}
                  placeholder="Edit author name"
                />
              )}
            />
            <Button size="sm" variant="outline" onClick={handleEditAuthor}>
              Cancel
            </Button>
            <Field.ErrorText>{errors.author_name?.message}</Field.ErrorText>
          </Field.Root>
        ) : null}
        <Flex justifyContent="center" mt={6}>
          <Button
            size="sm"
            type="submit"
            loadingText="Saving..."
            loading={loading}
            mr={3}
          >
            Submit
          </Button>
          <Link href="/book/home">
            <Button size="sm" variant="outline" colorPalette="red">
              Back home
            </Button>
          </Link>
        </Flex>
      </Stack>
    </form>
  );
};

export default BookForm;
