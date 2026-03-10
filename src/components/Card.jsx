import styles from './Card.module.css';

function Card({ pokemon, onClick, isFlipping }) {
  const handleClick = () => {
    if (!isFlipping) {
      onClick(pokemon.id);
    }
  };

  return (
    <div
      className={`${styles.cardContainer} ${isFlipping ? styles.flipped : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={`Pokémon card: ${pokemon.name}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className={styles.cardInner}>
        {/* Front face */}
        <div className={styles.cardFront}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className={styles.pokemonImage}
          />
          <p className={styles.pokemonName}>{pokemon.name}</p>
        </div>

        {/* Back face — shown while cards are flipped between turns */}
        <div className={styles.cardBack} />
      </div>
    </div>
  );
}

export default Card;
