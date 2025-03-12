'use client'

import {
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Text,
  Portal,
  Dialog,
} from "@chakra-ui/react";

interface DialogDeleteProps {
  title: string;
  onDelete: () => void;
  loading: boolean;
}

const DialogDelete = ({ title, onDelete, loading }: DialogDeleteProps) => {

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>
              This action cannot be undone. This will permanently delete the book {title} from the database.
            </Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={onDelete} loading={loading} loadingText="Deleting...">
              Delete
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </Dialog.Positioner>
    </Portal>
  );
};

export default DialogDelete;
