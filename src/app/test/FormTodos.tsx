'use client';
import { ActionTooltip } from '@/components/ActionTooltip';
import { zodResolver } from '@hookform/resolvers/zod';
import { Settings } from 'lucide-react';
import React, { useRef, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import type { PutBlobResult } from '@vercel/blob';
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
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Spinner } from '@/components/Spinner';
import { useCreateTodos, useImageUrl } from '../hooks/todo-hooks';
import { todoServices } from '../services/todo-services';
import { useMutation, useQuery } from '@tanstack/react-query';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  imageUrl: z.string().min(2).max(200),
});

export const FormTodos = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      imageUrl: '',
    },
  });

  const { isPending, onChange } = useImageUrl();
  const { mutate, isError, isPending: isMutatePending } = useCreateTodos();

  const isLoading = form.formState.isSubmitting;
  const imageUrl = form.getValues().imageUrl;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);

    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder='title todo' {...field} />
              </FormControl>
              {/* <FormDescription>
            This is your public display name.
          </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='imageUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div>
                  <Label htmlFor='picture'>Picture</Label>
                  <Input
                    accept='image/*'
                    onChange={(event) => onChange(event, field.onChange)}
                    id='picture'
                    type='file'
                  />
                </div>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPending && <Spinner className='h-6 w-6' />}
        {imageUrl && (
          <div className='h-20 w-20 relative border'>
            <Image fill src={imageUrl} alt='image' className='object-cover' />
          </div>
        )}
        <Button disabled={isLoading || isMutatePending} type='submit'>
          Create
        </Button>
      </form>
    </Form>
  );
};
