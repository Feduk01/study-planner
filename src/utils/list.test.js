import { describe, it, expect } from 'vitest';
import { splitTodosIntoDays } from './list';

describe('splitTodosIntoDays', () => {
  it('should split todos into days correctly', () => {
    const todos = [
      { text: 'Todo 1', day: 'må' },
      { text: 'Todo 2', day: 'ti' },
      { text: 'Todo 3', day: 'on' },
      { text: 'Todo 4', day: 'to' },
      { text: 'Todo 5', day: 'fr' },
      { text: 'Todo 6', day: 'lö' },
      { text: 'Todo 7', day: 'sö' },
      { text: 'Todo 8', day: 'må' },
    ];

    const [må, ti, on, to, fr, lö, sö] = splitTodosIntoDays(todos);

    expect(må).toEqual([{ text: 'Todo 1', day: 'må' }, { text: 'Todo 8', day: 'må' }]);
    expect(ti).toEqual([{ text: 'Todo 2', day: 'ti' }]);
    expect(on).toEqual([{ text: 'Todo 3', day: 'on' }]);
    expect(to).toEqual([{ text: 'Todo 4', day: 'to' }]);
    expect(fr).toEqual([{ text: 'Todo 5', day: 'fr' }]);
    expect(lö).toEqual([{ text: 'Todo 6', day: 'lö' }]);
    expect(sö).toEqual([{ text: 'Todo 7', day: 'sö' }]);
  });

  it('should handle an empty list of todos', () => {
    const todos = [];

    const [må, ti, on, to, fr, lö, sö] = splitTodosIntoDays(todos);

    expect(må).toEqual([]);
    expect(ti).toEqual([]);
    expect(on).toEqual([]);
    expect(to).toEqual([]);
    expect(fr).toEqual([]);
    expect(lö).toEqual([]);
    expect(sö).toEqual([]);
  });
});
