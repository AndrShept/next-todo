'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const sideBarLink = [
  {
    id: '1',
    name: 'Todo',
    href: '/todo',
  },
  {
    id: '2',
    name: 'Test',
    href: '/test',
  },

  
];

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className=' flex flex-col gap-y-1'>
      {sideBarLink.map((item) => (
        <Link
          key={item.id}
          className={cn(
            'text-muted-foreground hover:text-primary bg-secondary/60 hover:bg-secondary p-2 rounded-md transition cursor-pointer w-full ',
            {
              'text-primary bg-secondary': pathname === item.href,
            }
          )}
          href={item.href}
        >
          {item.name}
        </Link>
      ))}
    </section>
  );
};
