'use client'
import { ActionTooltip } from '@/components/ActionTooltip';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import React from 'react';

const page = () => {
  return (
    
    <div>
        <li></li>
        <ul></ul>
        div
        <h1></h1>
        <h2></h2>
        <p></p>
        <span></span>
        <section></section>
        <main></main>
        <header></header>
        <footer></footer>
        <aside></aside>
        <article></article>
        <form></form>
        <input/>
        <button></button>
        


      <div>
            
        <ActionTooltip label='Settings'>
          <Button
          onClick={() => alert( '!!!' )}
            variant={'ghost'}
            size={'icon'}
          >
            <Settings />
          </Button>
        </ActionTooltip>

        <p>dasdsadsa</p>
        <div>
          <h1 className='font-bold text-xl text-cyan-600'>HELLO</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
