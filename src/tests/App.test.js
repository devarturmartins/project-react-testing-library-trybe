import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    expect(home).toBeInTheDocument();
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    expect(about).toBeInTheDocument();
    const favoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(favoritePokemon).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(favoritePokemon);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/xablau');
    });
    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
    expect(history.location.pathname).toBe('/xablau');
  });
});
