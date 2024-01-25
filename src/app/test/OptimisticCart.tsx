import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface OptimisticCartProps {
  optimisticTodo: { imageUrl: string; title: string };
}

export const OptimisticCart = ({ optimisticTodo }: OptimisticCartProps) => {
  return (
    <Card className='flex opacity-50 min-w-[350px] max-w-[400px]  justify-between items-center hover:shadow-lg transition cursor-pointer'>
      <CardHeader>
        <div className='h-10 w-10 relative'>
          <Image
            className='object-cover'
            alt='image'
            fill
            src={optimisticTodo.imageUrl}
          />
        </div>
      </CardHeader>
      <CardContent className='flex-1 '>
        <p className=' break-all'>{optimisticTodo.title}</p>
      </CardContent>
      <CardFooter>
        <Button size={'sm'} className=''>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
