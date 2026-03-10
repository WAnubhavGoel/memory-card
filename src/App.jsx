import { useState, useEffect } from 'react';
import Scoreboard from './components/Scoreboard';
import GameBoard from './components/GameBoard';
import './App.css';

// Fisher-Yates shuffle — returns a new shuffled copy of the array
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// How long each half of the card flip takes in milliseconds
const FLIP_DURATION = 400;

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLost, setShowLost] = useState(false);
  const [showWon, setShowWon] = useState(false);

  // Fetch 10 Pokémon from the PokéAPI when the component mounts
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await res.json();

        const pokemon = data.results.map((p) => {
          // The ID is the last segment of the resource URL
          const id = parseInt(p.url.split('/').filter(Boolean).pop(), 10);
          return {
            id,
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });

        setPokemonData(shuffleArray(pokemon));
      } catch (err) {
        console.error('Failed to fetch Pokémon:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleCardClick = (pokemonId) => {
    if (isFlipping) return;

    if (clickedCards.includes(pokemonId)) {
      // Player clicked a card they already clicked — show the lose popup
      setShowLost(true);
    } else {
      // Valid click — increase score and record this card as clicked
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setBestScore((prev) => Math.max(prev, newScore));
      setClickedCards((prev) => [...prev, pokemonId]);

      if (newScore === 10) {
        setShowWon(true);
        return;
      }

      // Flip all cards face-down, shuffle while hidden, then flip back up
      setIsFlipping(true);

      setTimeout(() => {
        setPokemonData((prev) => shuffleArray(prev));
      }, FLIP_DURATION);

      setTimeout(() => {
        setIsFlipping(false);
      }, FLIP_DURATION * 2);
    }
  };

  const handleRestart = () => {
    setCurrentScore(0);
    setClickedCards([]);
    setPokemonData((prev) => shuffleArray(prev));
    setShowLost(false);
    setShowWon(false);
  };
  return (
    <div className="app">
      <h1 className="title">Pokémon Memory Game</h1>
      <p className="subtitle">Click every card without clicking the same one twice.</p>

      <Scoreboard currentScore={currentScore} bestScore={bestScore} />

      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <GameBoard
          pokemonData={pokemonData}
          onCardClick={handleCardClick}
          isFlipping={isFlipping}
        />
      )}

      {showLost && (
        <div className="overlay">
          <div className="modal">
            <p className="lostText">You lost</p>
            <button className="restartBtn" onClick={handleRestart}>
              Restart
            </button>
          </div>
        </div>
      )}

      {showWon && (
        <div className="overlay">
          <div className="modal">
            <p className="lostText">CONGRATULATIONS</p>
            <p className="lostText">YOU WIN!</p>
            <button className="restartBtn" onClick={handleRestart}>
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default App;
