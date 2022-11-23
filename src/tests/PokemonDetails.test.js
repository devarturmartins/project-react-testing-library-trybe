import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails.js', () => {
//   beforeEach(() => {
//     const { history } = renderWithRouter(<App />);
//     act(() => {
//       history.push('/pokemon/25');
//     });
//   });
  const POKEMON = '/pokemon/25';
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    const linkNavigation = screen.getByRole('link', {
      name: /more details/i,
    });
    act(() => {
      history.push(POKEMON);
    });
    const namePokemon = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const description = screen.getByText(/This intelligent Pokémon/i);
    expect(description).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(linkNavigation).not.toBeInTheDocument();
    expect(namePokemon).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(POKEMON);
    });
    const locations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);
    const locationImg = screen.getAllByRole('img');
    expect(locationImg[1]).toBeInTheDocument();
    expect(locationImg[2]).toBeInTheDocument();
    expect(locationImg[1].alt).toBe('Pikachu location');
    expect(locationImg[2].alt).toBe('Pikachu location');
    expect(locationImg[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImg[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
    expect(locations).toBeInTheDocument();
  });
  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(POKEMON);
    });
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkbox).toBeInTheDocument();
    console.log(checkbox);
    expect(checkbox.checked).toBe(false);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    const labelCheckbox = screen.getByLabelText(/pokémon favoritado\?/i);
    expect(labelCheckbox).toBeInTheDocument();
  });
});
