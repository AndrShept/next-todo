'use client';
import { useTodo } from '@/lib/store/todo-store';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import qs from 'query-string';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePageStore } from '@/lib/store/page-store';

export const Pagination = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useTodo();
  const {
    queryPage,
    setQueryPage,
    decrementQueryPage,
    incrementQueryPage,
    amountOnPage,
  } = usePageStore();

  const pages = [...Array(Math.ceil(data.length / amountOnPage))].map(
    (page, idx) => (page = idx + 1)
  );
  const url = qs.stringifyUrl(
    {
      url: pathname,
      query: {
        queryPage,
      },
    },
    {}
  );
  useEffect(() => {
    router.push(url, { scroll: false });
  }, [queryPage, router, url]);
  return (
    <ul className=' flex gap-x-1 place-content-center mt-auto pb-4 items-center'>
      <Button
        onClick={decrementQueryPage}
        disabled={queryPage === 1}
        className={cn(' rounded-full text-muted-foreground h-8 w-8 p-1')}
        variant={'ghost'}
        size={'sm'}
      >
        <ChevronLeft size={20} />
      </Button>
      {pages.map((items) => (
        <Button
          onClick={() => setQueryPage(items)}
          className={cn(
            ' rounded-full text-muted-foreground',
            queryPage === items &&
              'bg-zinc-300 text-white hover:bg-zinc-400 hover:text-white transition'
          )}
          variant={'outline'}
          size={'sm'}
          key={items}
        >
          {items}
        </Button>
      ))}
      <Button
        disabled={pages.length === queryPage}
        onClick={incrementQueryPage}
        className={cn(' rounded-full text-muted-foreground h-8 w-8 p-1')}
        variant={'ghost'}
        size={'sm'}
      >
        <ChevronRight size={20} />
      </Button>
    </ul>
  );
};
