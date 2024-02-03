'use client';

import React, { useState } from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';
import { useGetTodos } from '../../hooks/todo-hooks';
import { TodosList } from './TodosList';
import { useMutationState } from '@tanstack/react-query';
import { OptimisticCart } from './OptimisticCart';
import { BackgroundGradient } from '@/components/ui/background-gradient';

export const Todos = () => {
  const { data: todos, error, status } = useGetTodos();

  const [optimisticIsPending] = useMutationState<string>({
    filters: { status: 'pending', mutationKey: ['addTodos']  },
    select: (data) => data.state.status,
  });
  const [optimisticTodo] = useMutationState<any>({
    filters: { status: 'pending' },
    select: (data) => data.state.variables,
  });

  if (status === 'pending') return <LoadingSkeleton />;

  if (status === 'error') return 'An error has occurred: ' + error?.message;

  return (
    <ul className='mx-auto flex-1 flex flex-col gap-4 mt-6'>
      {todos.map((todo) => (
        <BackgroundGradient animate={true}  key={todo.id}>
        <TodosList  todo={todo} />
        </BackgroundGradient>
      ))}
      {optimisticIsPending && (
        <OptimisticCart optimisticTodo={optimisticTodo} />
      )}
    </ul>
  );
};
