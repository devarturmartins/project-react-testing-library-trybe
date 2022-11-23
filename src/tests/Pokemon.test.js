import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  const POKEMON = '/pokemon/25';
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const imgEl = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(imgEl).toBeInTheDocument();
    expect(imgEl.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgEl.alt).toBe('Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(details).toBeInTheDocument();
    expect(details.href).toContain(POKEMON);
  });
  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(POKEMON);
    });
    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();
  });
  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe(POKEMON);
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(POKEMON);
    });
    const favorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favorite);
    act(() => {
      history.push('/');
    });
    const pokemonFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(pokemonFavorite).toBeInTheDocument();
    expect(pokemonFavorite.alt).toBe('Pikachu is marked as favorite');
    expect(pokemonFavorite.src).toContain('/star-icon.svg');
  });
});
