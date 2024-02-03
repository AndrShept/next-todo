'use client';
import { cn } from '@/lib/utils';
import { ChevronsDown, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ElementRef, useLayoutEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { useMediaQuery } from 'usehooks-ts';
import { useOnClickOutside } from 'usehooks-ts';
import { ThemeButton } from './ThemeButton';
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
  {
    id: '3',
    name: 'Posts',
    href: '/posts',
  },
];

export const Sidebar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const sidebarRef = useRef<ElementRef<'section'>>(null);
  const navbarRef = useRef<ElementRef<'ul'>>(null);
  const pathname = usePathname();

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      sidebarRef.current.style.width = '0px';
      sidebarRef.current.style.padding = '0';
      navbarRef.current.style.display = 'none';

      setTimeout(() => {
        setIsCollapsed(false);
        setIsResetting(true);
      }, 300);
    }
  };
  const collapseReset = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      sidebarRef.current.style.width = '200px';

      sidebarRef.current.style.padding = '8px';
      navbarRef.current.style.display = 'flex';

      setTimeout(() => {
        setIsCollapsed(false);
        setIsResetting(false);
      }, 300);
    }
  };
  const handleClickOutside = () => {
    if (isMobile) {
      collapse();
    }
  };
  useOnClickOutside(sidebarRef, handleClickOutside);
  useLayoutEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      collapseReset();
    }
  }, [isMobile]);
  return (
    <>
      <section
        ref={sidebarRef}
        className={cn(
          ' flex flex-col gap-y-1 sticky top-0 h-full   w-[200px] sm:p-4 p-2  group ',
          {
            'transition-all ease-in-out duration-300 ': isCollapsed,
            
            'fixed z-20 bg-secondary inset-y-0': isMobile,
          }
        )}
      >
        <ul ref={navbarRef} className=' flex-col flex gap-1 mt-7 '>
          {sideBarLink.map((item) => (
            <Link
              key={item.id}
              className={cn(
                'text-muted-foreground hover:text-primary bg-secondary/60  p-2 rounded-md transition cursor-pointer w-full ',
                {
                  'text-primary bg-secondary': pathname === item.href,
                  'text-secondary bg-primary/40 hover:bg-primary/20 hover:text-secondary ':
                    pathname === item.href && isMobile,
                }
              )}
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </ul>
        <div className='mt-10'>
          <ThemeButton />
        </div>
        {!isResetting && (
          <button
            onClick={collapse}
            className='right-1 top-1 duration-300 group-hover:opacity-100 opacity-0 absolute px-2 py-1 flex items-center justify-center hover:bg-zinc-100 transition rounded-md text-muted-foreground hover:text-black'
          >
            <ChevronsLeft className='  w-5 h-5' />
          </button>
        )}
        {isResetting && (
          <button
            onClick={collapseReset}
            className='-right-10 top-0  absolute px-2 py-1 flex items-center justify-center hover:bg-zinc-100 transition rounded-md text-muted-foreground hover:text-black'
          >
            <ChevronsRight className='  w-5 h-5' />
          </button>
        )}
      </section>
    </>
  );
};
