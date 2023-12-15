'use client';

import React, { useId } from 'react';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTodo } from '@/lib/store/todo-store';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { ActionTooltip } from './ActionTooltip';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  content: z.string().min(3),
});

export const InputForm = () => {
  const form = useForm({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(formSchema),
  });
  const {  addTodo } = useTodo();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addTodo({
      id: uuidv4(),
      content: values.content,
      createdAt: format(new Date(), 'd MMM yyyy, HH:mm'),
      isCompleted: false,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-x-2   '>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem className='flex-1  '>
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <div className='relative'>
                  <Input
                    className={'pr-8'}
                    placeholder='Enter todos...'
                    {...field}
                  />
                  <Button
                    disabled={!field.value}
                    type='reset'
                    variant={'ghost'}
                    size={'icon'}
                    className='absolute right-2 top-2 h-6 w-6 '
                  >
                    <ActionTooltip label='clear input'>
                      <X
                        size={18}
                        onClick={() => form.setValue('content', '')}
                      />
                    </ActionTooltip>
                  </Button>
                </div>
              </FormControl>

              <FormDescription>
                Press ENTER add todo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='' type='submit'>
          Create
        </Button>
      </form>
    </Form>
  );
};
