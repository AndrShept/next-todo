import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useModalStore } from '@/lib/store/modal-store';
export const PostModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const [isMount, setIsMount] = useState(false);
  const modalIsOpen = isOpen && type === 'postById';

  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) {
    return;
  }

  return (
    <Dialog open={modalIsOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data?.post.title}</DialogTitle>
          <DialogDescription>{data?.post.body}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
