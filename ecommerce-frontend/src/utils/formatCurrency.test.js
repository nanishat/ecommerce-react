import {it, expect, describe } from 'vitest';
import formatCurrency from './formatCurrency';

describe('formatCurrency', () => {
  it('formats 1999 cents as $19.99', () => {
    expect(formatCurrency(1999)).toBe('$19.99');
  })
  
  it('display two decimals', () => {
    expect(formatCurrency(1090)).toBe('$10.90');
    expect(formatCurrency(100)).toBe('$1.00');
  })
})