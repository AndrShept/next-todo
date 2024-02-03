'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { IPost, useGetPosts, useGetPostsOnScroll } from '../hooks/post-hooks';
import { PostList } from './PostList';
import { Skeleton } from '@/components/ui/skeleton';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@/components/Spinner';

export const Post = () => {
  // const { data: posts, error, isPending } = useGetPosts();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const {
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useGetPostsOnScroll();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === 'error') {
    return <p>scrol error {error.message}</p>;
  }

  if (status === 'pending') return <Post.Skeleton />;

  return (
    <>
      <ul className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
        {data.pages.flat().map((post) => (
          <PostList post={post} ref={ref} key={post.id} />
        ))}
      </ul>
      {isFetchingNextPage && (
        <div className='mx-auto p-3'>
          <Spinner className='h-8 w-8' />
        </div>
      )}
      {/* <Button
        disabled={isFetchingNextPage || !hasNextPage}
        onClick={() => fetchNextPage()}
        className='mt-4 mx-auto'
      >
        {isFetchingNextPage && <Spinner />}
        {hasNextPage && <span className='ml-2'> Get More</span>}
        {!hasNextPage && <span className='ml-2'> nothing load</span>}
      </Button> */}
    </>
  );
};

Post.Skeleton = () => {
  return (
    <ul className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
      {[...Array(15)].map((_, idx) => (
        <Skeleton key={idx} className='min-h-[150px] min-w-[100px]' />
      ))}
    </ul>
  );
};
