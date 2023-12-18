import React, { useEffect, useState, useTransition } from 'react';
import qs from 'query-string';
import { Input } from './ui/input';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { ActionTooltip } from './ActionTooltip';
import { usePathname, useRouter } from 'next/navigation';

export const SearchInput = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const url = qs.stringifyUrl(
    {
      url: pathname,
      query: {
        search,
      },
    },
    { skipNull: true, skipEmptyString: true }
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearch(e.target.value);
    });
  };
  useEffect(() => {
    router.push(url);
  }, [router, url]);
  return (
    <div className='relative my-4 mx-auto max-w-lg'>
      <Search
        size={20}
        className='absolute text-muted-foreground left-2 top-[10px] '
      />
      <Input
        placeholder='Search...'
        value={search}
        onChange={handleChange}
        className='pr-8 pl-9 focus-visible:ring-0 focus-visible:ring-offset-0'
      />

      <Button
        variant={'ghost'}
        size={'icon'}
        className='absolute text-muted-foreground right-2 top-[7px] h-7 w-7 '
        onClick={() => {
          setSearch('');
        }}
        disabled={!search.length}
      >
        <ActionTooltip label='clear'>
          <X size={15} />
        </ActionTooltip>
      </Button>
    </div>
  );
};
