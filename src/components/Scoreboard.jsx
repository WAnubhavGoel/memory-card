import styles from './Scoreboard.module.css';

function Scoreboard({ currentScore, bestScore }) {
  return (
    <div className={styles.scoreboard}>
      <span>Score: {currentScore}</span>
      <span className={styles.best}>Best: {bestScore}</span>
    </div>
  );
}

export default Scoreboard;
