'use client';
import {
  useIsMutating,
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React from 'react';
import { getTodos, todoServices } from '../services/todo-services';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LoadingSkeleton } from './LoadingSkeleton';
import {
  useCreateTodos,
  useDeleteTodos,
  useGetTodos,
} from '../hooks/todo-hooks';
import { Todo } from '@prisma/client';

export const TodosList = () => {
  const { mutate } = useDeleteTodos();
  const { data: todos, error, status } = useGetTodos();
  const [optimisticIsPending] = useMutationState<string>({
    filters: { status: 'pending', mutationKey: ['addTodos'] },
    select: (data) => data.state.status,
  });
  const [optimisticTodo] = useMutationState<any>({
    filters: { status: 'pending' },
    select: (data) => data.state.variables,
  });

  if (status === 'pending') return <LoadingSkeleton />;

  if (status === 'error') return 'An error has occurred: ' + error?.message;

  return (
    <ul className='mx-auto flex-1 flex flex-col gap-4'>
      {todos?.map((todo) => (
        <Card
          className='flex min-w-[350px] max-w-[400px]  justify-between items-center hover:shadow-lg transition cursor-pointer'
          key={todo.id}
        >
          <CardHeader>
            <div className='h-10 w-10 relative'>
              <Image
                className='object-cover'
                alt='image'
                fill
                src={todo.imageUrl || ''}
              />
            </div>
          </CardHeader>
          <CardContent className='flex-1 '>
            <p className=' break-all'>{todo.title}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => mutate(todo.id.toString())} className=''>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
      {optimisticIsPending && (
        <Card className='flex opacity-50 min-w-[350px] max-w-[400px]  justify-between items-center hover:shadow-lg transition cursor-pointer'>
          <CardHeader>
            <div className='h-10 w-10 relative'>
              <Image
                className='object-cover'
                alt='image'
                fill
                src={optimisticTodo.imageUrl}
              />
            </div>
          </CardHeader>
          <CardContent className='flex-1 '>
            <p className=' break-all'>{optimisticTodo.title}</p>
          </CardContent>
          <CardFooter>
            <Button className=''>Delete</Button>
          </CardFooter>
        </Card>
      )}
    </ul>
  );
};
