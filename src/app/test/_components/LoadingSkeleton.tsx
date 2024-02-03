import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const LoadingSkeleton = () => {
 
  return (
    <section className='mx-auto flex-1 flex flex-col gap-6 mt-5'>
      {[...Array(4)].map((_, idx) => (
        <Skeleton key={idx} className='w-[340px] h-[120px] rounded-[20px] ' />
      ))}
    </section>
  );
};
