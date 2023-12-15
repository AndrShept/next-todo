'use client';
import { InputForm } from '@/components/InputForm';
import { TodoItem } from '@/components/TodoItem';
import { Button } from '@/components/ui/button';
import { useTodo } from '@/lib/store/todo-store';
import React, { useEffect, useState } from 'react';

const TodoPage = () => {
  const { data, clearAllTodo } = useTodo();
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) {
    return;
  }
  return (
    <>
      <h1 className='text-center font-semibold text-2xl mb-10'>My Todo</h1>
      <div className='flex flex-col gap-2  mx-auto max-w-lg'>
        <InputForm />
        <Button onClick={clearAllTodo} variant={'secondary'}>
          Clear All
        </Button>

        <div className='border flex flex-col-reverse gap-4 p-4 h-full rounded-md'>
          {data.length > 0 ? (
            data.map((item) => <TodoItem key={item.id} item={item} />)
          ) : (
            <p className='text-muted-foreground  text-center '>
              Cписок пустий !
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoPage;
