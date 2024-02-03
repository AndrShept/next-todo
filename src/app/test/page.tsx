import React from 'react';

import { FormTodos } from './_components/FormTodos';
import { Todos } from './_components/Todos';

const TestPage = async () => {
  return (
    <>
      <FormTodos />

      <Todos />
    </>
  );
};

export default TestPage;
