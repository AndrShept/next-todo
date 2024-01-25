'use client'

import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';

export const TestItem = ({ todo }: { todo: Todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
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
        {isEdit && <Input />}
        {!isEdit && <p className=' break-all'>{todo.title}</p>}
      </CardContent>
      <CardFooter>
        <Button className=''>Delete</Button>
        <Button
          variant={'outline'}
          onClick={() => setIsEdit((prev) => !prev)}
          className='ml-2'
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
