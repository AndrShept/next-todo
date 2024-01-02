'use client';
import { InputForm } from '@/components/InputForm';
import { Pagination } from '@/components/Pagination';
import { SearchInput } from '@/components/SearchInput';
import { TodoItem } from '@/components/TodoItem';
import { Button } from '@/components/ui/button';
import { useTodo } from '@/lib/store/todo-store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { usePageStore } from '@/lib/store/page-store';

const TodoPage = () => {
  const { data, clearAllTodo } = useTodo();
  const { queryPage: startPage, amountOnPage, setQueryPage } = usePageStore();
  const [isMount, setIsMount] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const queryPage = searchParams.get('queryPage')
    ? searchParams.get('queryPage')
    : startPage;
  const pathname = usePathname();
  const router = useRouter();



  const url = qs.stringifyUrl(
    {
      url: pathname,
      query: {
        queryPage,
      },
    },
    {}
  );
  let startIdx;
  let endIdx;
  if (queryPage) {
    startIdx = (+queryPage - 1) * amountOnPage;
    endIdx = startIdx + amountOnPage;
  }

  useEffect(() => {
    router.push(url);
    setIsMount(true);
  }, [router, url]);
  if (!isMount) {
    return;
  }
  const searchData = search
    ? data.filter((item) => item.content?.includes(search))
    : data;

  return (
    <div className=' flex-1 h-full flex  flex-col  sm:ml-[200px]  sm:p-4 p-2 border-r  '>
      <h1 className='text-center font-semibold text-2xl mb-5 '>My Todo</h1>

      <div className=' sm:w-[470px] w-[350px] mx-auto '>
        <div>
          <InputForm type='submit' />
          <Button
            onClick={() => {
              if (confirm('DELETE ALL ?')) {
                clearAllTodo();
                setQueryPage(1)

              }
            }}
            variant={'destructive'}
            className='w-full'
          >
            Clear All
          </Button>
          <SearchInput />
        </div>

        <div className=' flex  flex-col-reverse  gap-4 p-6 rounded-md'>
          {data.length > 0 &&
            (searchData ? searchData : data)
              .map((item) => <TodoItem key={item.id} item={item} />)
              .slice(startIdx, endIdx).toReversed()}

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

      {!search && data.length !== 0 && <Pagination />}
    </div>
  );
};

export default TodoPage;
