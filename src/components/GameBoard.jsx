import Card from './Card';
import styles from './GameBoard.module.css';

// GameBoard renders the 5×2 grid of Pokémon cards.
// It receives the (already shuffled) pokemonData array from App
// and passes the click handler and flip state down to each Card.
function GameBoard({ pokemonData, onCardClick, isFlipping }) {
  return (
    <div className={styles.gameBoard}>
      {pokemonData.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          onClick={onCardClick}
          isFlipping={isFlipping}
        />
      ))}
    </div>
  );
}

export default GameBoard;
