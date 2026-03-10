# Pokemon Memory Card Game

A simple memory card game built with React. The goal of the game is to click different Pokémon cards without clicking the same card twice. After every turn the cards shuffle, making it harder to remember which ones you already picked.

## How the Game Works

The game displays 10 Pokémon cards fetched from the PokéAPI.

You click cards one by one. Each time you click a new card your score increases by 1 and the cards shuffle into a random order.

If you click a card that you already selected before, the game ends and a popup appears saying "You lost". From there you can restart the game.

## Features

10 Pokémon cards fetched from an external API

Cards shuffle randomly after every click

Current score tracking

Best score tracking during the session

Lose popup with restart button

Simple dark themed interface

Card flip behavior after each turn

## Technologies Used

React

Vite

JavaScript

CSS

PokéAPI

## Project Structure

src
components
Card.jsx
GameBoard.jsx
Scoreboard.jsx
LoseModal.jsx

App.jsx
main.jsx
index.css

## Installation

Clone the repository

git clone https://github.com/your-username/pokemon-memory-game.git

Navigate to the project folder

cd pokemon-memory-game

Install dependencies

npm install

Run the development server

npm run dev

Open the local server link shown in the terminal to view the game in your browser.

## Game Rules

Click a Pokémon card to gain points.

Do not click the same card twice.

Cards shuffle after every turn.

If you click a previously selected card, you lose.

Press restart in the popup to start a new game.

## API Used

This project fetches Pokémon data from

https://pokeapi.co/

The API is used to retrieve Pokémon names and images for the cards.

## Future Improvements

Add win condition when all cards are selected correctly

Add animations for smoother card flipping

Add mobile responsive improvements
