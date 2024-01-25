import { PutBlobResult } from '@vercel/blob';
import { startTransition, useTransition } from 'react';
import { todoServices } from '../services/todo-services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useImageUrl = () => {
  const [isPending, startTransition] = useTransition();
  const onChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (url: string) => void
  ) => {
    if (
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      throw new Error('No file selected');
    }

    const file = event.target.files[0];
    startTransition(async () => {
      const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;
      onChange(newBlob.url);
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
    queryFn: todoServices.getTodos,
  });
};

export const useCreateTodos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addTodos'],
    mutationFn: todoServices.createTodo,
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast(`Todo has been created ${data?.created_at}`, {
       
      });
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
    mutationFn: todoServices.deleteTodo,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },

  });
};
