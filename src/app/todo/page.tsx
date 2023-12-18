'use client';
import { InputForm } from '@/components/InputForm';
import { SearchInput } from '@/components/SearchInput';
import { TodoItem } from '@/components/TodoItem';
import { Button } from '@/components/ui/button';
import { TodoProps, useTodo } from '@/lib/store/todo-store';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TodoPage = () => {
  const { data, clearAllTodo } = useTodo();
  const [isMount, setIsMount] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) {
    return;
  }
  const searchData = search
    ? data.filter((item) => item.content?.includes(search))
    : data;

  return (
    <>
      <h1 className='text-center font-semibold text-2xl mb-10'>My Todo</h1>
  
      <div className='flex flex-col gap-2  mx-auto max-w-lg'>
        <InputForm type='submit' />
        <Button
          onClick={() => {
            if (confirm('DELETE ALL ?')) {
              clearAllTodo();
            }
          }}
          variant={'secondary'}
        >
          Clear All
        </Button>
        <SearchInput />
        <div className='border flex flex-col-reverse gap-4 p-4 h-full rounded-md'>
          {data.length > 0 &&
            (searchData ? searchData : data).map((item) => (
              <TodoItem key={item.id} item={item} />
            ))}

          {data.length === 0 && (
            <p className='text-muted-foreground  text-center '>
              Cписок пустий !
            </p>
          )}
          {searchData?.length === 0 && data.length !== 0 && (
            <p className='text-muted-foreground  text-center '>
              нічого не знайдено
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoPage;
