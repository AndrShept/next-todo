import React from 'react';

import { FormTodos } from './FormTodos';
import { TodosList } from './TodosList';

const TestPage = () => {
  
  return (
    <section className='flex flex-col h-full gap-8 flex-1 '>
      <FormTodos />

      
      <TodosList />
    </section>
  );
};

export default TestPage;
