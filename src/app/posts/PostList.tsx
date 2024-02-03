import React, { ElementRef, forwardRef } from 'react';
import { IPost } from '../hooks/post-hooks';
import { useModalStore } from '@/lib/store/modal-store';
interface PostListProps {
  post: IPost;
 
}
const PostList = forwardRef<HTMLDivElement, PostListProps>(({ post }, ref) => {
  const { onOpen } = useModalStore();

  const handleClick = () => {
    onOpen('postById', { post });
  };

  return (
    <>
      <article
        ref={ref}
        onClick={handleClick}
        className='flex flex-col justify-between p-4 border rounded-lg bg-muted/50 cursor-pointer gap-2 hover:bg-muted/80 transition-all'
      >
        <h2>{post.title}</h2>
        <p className='text-muted-foreground text-sm flex-1 '>{post.body}</p>
        <p>{post.id}</p>
      </article>
    </>
  );
});

PostList.displayName = 'PostList';
export { PostList };
