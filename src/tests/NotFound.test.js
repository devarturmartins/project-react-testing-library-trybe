import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente NotFound', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const titleEl = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(titleEl).toBeInTheDocument();
  });
  test('este se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imgEl = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgEl).toBeInTheDocument();
    expect(imgEl.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
