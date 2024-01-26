import React from 'react';

import { FormTodos } from './FormTodos';
import { Todos } from './Todos';

const TestPage = async () => {
  return (
    <>
      <FormTodos />

      <Todos />
    </>
  );
};

export default TestPage;
