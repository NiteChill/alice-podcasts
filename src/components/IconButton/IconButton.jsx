import styles from './IconButton.module.scss';

export default function IconButton({style = 'standard', icon = 'settings', border_radius,  onClick}) {
  return (
    <div className={style === 'standard' ? styles.icon_button_standard : style === 'tonal' && styles.icon_button_tonal} style={{borderRadius: border_radius}} onClick={onClick}>
      <div className={styles.state_layer}>
        <span className='material-symbols-outlined'>{icon}</span>
      </div>
    </div>
  );
}