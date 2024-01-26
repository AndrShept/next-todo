import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const LoadingSkeleton = () => {
 
  return (
    <section className='mx-auto flex-1 flex flex-col gap-4 mt-4'>
      {[...Array(4)].map((_, idx) => (
        <Skeleton key={idx} className='w-[350px] h-[90px] ' />
      ))}
    </section>
  );
};
