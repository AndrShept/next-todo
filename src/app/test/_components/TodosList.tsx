'use client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { useDeleteTodos } from '../../hooks/todo-hooks';
import { Todo } from '@prisma/client';

export const TodosList = ({ todo }: { todo: Todo }) => {
  const { mutate } = useDeleteTodos();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <article className='flex min-w-[350px] max-w-[350px] bg-white/[95]   sm:gap-4  gap-3 px-6 py-10  rounded-[20px] justify-between items-center hover:shadow-lg transition cursor-pointer'>
        <section>
          <div className='h-10 w-10 relative'>
            <Image
              className='object-cover'
              alt='image'
              fill
              src={todo.imageUrl || ''}
            />
          </div>
        </section>
        <section className='flex-1 text-sm text-black'>
          {isEdit && <Input />}
          {!isEdit && <p className=' break-all'>{todo.title}</p>}
        </section>
        <section>
          <Button
            variant={'default'}
            onClick={() => mutate(todo.id.toString())}
            className=''
          >
            Delete
          </Button>
          <Button
            variant={'outline'}
            onClick={() => {
              setIsEdit((prev) => !prev);
            }}
            className='ml-2 '
          >
            Edit
          </Button>
        </section>
      </article>
    </>
  );
};
