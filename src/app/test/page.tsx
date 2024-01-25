import React from 'react';

import { FormTodos } from './FormTodos';
import { Todos } from './Todos';

const TestPage = async () => {
  return (
    <section className='flex flex-col h-full gap-8 flex-1 '>
      <FormTodos />

      <Todos />
    </section>
  );
};

export default TestPage;
