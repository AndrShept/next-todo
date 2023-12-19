'use client';
import { TodoProps, useTodo } from '@/lib/store/todo-store';
import { Button } from './ui/button';
import { Edit, Trash } from 'lucide-react';
import { ActionTooltip } from './ActionTooltip';
import { MouseEvent, useState } from 'react';
import { cn } from '@/lib/utils';
import { InputForm } from './InputForm';

export const TodoItem = ({ item }: { item: TodoProps }) => {
  const { removeTodo, onComplete } = useTodo();
  const [isEdit, setIsEdit] = useState(false);
  const onEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEdit((prev) => !prev);
  };

  return (
    <div>
      <p className='text-muted-foreground text-xs'>
        {item.updatedAt ? item.updatedAt + ' (update)' : item.createdAt}
      </p>
      {!isEdit && (
        <div
          onClick={() => onComplete(item.id)}
          className={cn(
            'p-3 gap-2 flex  border cursor-pointer rounded-md hover:bg-secondary/60 transition',
            {
              'bg-green-400 hover:bg-green-500/80 border-green-400 text-white':
                item.isCompleted,
            }
          )}
        >
          <p className='break-all flex-1 '>{item.content}</p>

          <div className='flex text-muted-foreground space-x-1  '>
            <Button
              onClick={onEdit}
              className={cn('h-6 w-6 ', {})}
              variant={'outline'}
              size={'icon'}
            >
              <ActionTooltip label='edit'>
                <Edit size={17} />
              </ActionTooltip>
            </Button>
            <Button className='h-6 w-6' variant={'outline'} size={'icon'}>
              <ActionTooltip label='delete'>
                <Trash onClick={() => removeTodo(item.id)} size={17} />
              </ActionTooltip>
            </Button>
          </div>
        </div>
      )}
      {isEdit && (
        <InputForm
          setIsEdit={setIsEdit}
          content={item.content}
          id={item.id}
          type='edit'
        />
      )}
    </div>
  );
};
