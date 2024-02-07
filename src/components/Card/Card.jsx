import { podcasts } from '../../datas/podcasts';
import Player from '../Player/Player';
import styles from './Card.module.scss';

export default function Card({id = 0, setActiveCard, expanded = false, display = false}) {
  return (
    <div className={expanded ? styles.card_expanded : styles.card} style={{display: display && display}}>
      <div
        className={styles.img}
        style={{
          background: `center / cover no-repeat url('${podcasts[id].img}')`,
        }}
        onClick={() => setActiveCard(id)}
      ></div>
      <div className={styles.container}>
        {!expanded && (
          <div className={styles.text}>
            <h2>{podcasts[id].title}</h2>
            <p>{podcasts[id].author}</p>
          </div>
        )}
        <Player audio={podcasts[id].audio} />
      </div>
    </div>
  );
}
