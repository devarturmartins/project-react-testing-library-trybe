import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex.js', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const titleEl = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    expect(titleEl).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(buttonNext);
    const nextPokemon = screen.getByRole('img', {
      name: /charmander sprite/i,
    });
    expect(nextPokemon).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez;', () => {
    renderWithRouter(<App />);
    const pokemonList = screen.getAllByTestId('pokemon-name');
    expect(pokemonList).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const arrayName = [/electric/i, /fire/i, /bug/i, /poison/i, /psychic/i, /normal/i, /dragon/i];
    const buttons = screen.getAllByTestId('pokemon-type-button');
    for (let i = 0; i < buttons.length; i += 1) {
      expect(buttons[i]).toHaveTextContent(arrayName[i]);
    }
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(buttonAll).toBeInTheDocument();
  });
});
