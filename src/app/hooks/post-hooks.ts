import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const useGetPosts = () =>
  useQuery<IPost[]>({
    queryKey: ['posts'],
    queryFn: () =>
      fetch(
        'https://jsonplaceholder.typicode.com/posts?_start=10&_limit=10'
      ).then((data) => data.json()),
  });
export const useGetPostsOnScroll = () =>
  useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) =>
      fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${pageParam}&_limit=10`
      ).then((data) => data.json()),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.length) {
        return undefined;
      }
      return lastPage.length + lastPageParam;
    },
  });
