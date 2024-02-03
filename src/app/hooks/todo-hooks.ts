import { PutBlobResult } from '@vercel/blob';
import { startTransition, useTransition } from 'react';
import { TodoServices } from '../services/todo-services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useImageUrl = () => {
  const [isPending, startTransition] = useTransition();
  const onChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (url: string) => void
  ) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    if (!file) {
      throw new Error('No file selected');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    startTransition(async () => {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      onChange(data.secure_url);
    });
  };
  return {
    isPending,
    onChange,
  };
};

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: TodoServices.getTodos,
  });
};

export const useCreateTodos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addTodos'],
    mutationFn: TodoServices.createTodo,
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast(`Todo has been created ${data?.created_at}`, {});
    },


    // onSuccess: () => {
    //   // Invalidate and refetch
    //   queryClient.invalidateQueries({ queryKey: ['todos'] });
    // },
  });
};

export const useDeleteTodos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteTodos'],
    mutationFn: TodoServices.deleteTodo,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
