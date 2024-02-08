import TrackWave from '../TrackWave/TrackWave';
import IconButton from '../IconButton/IconButton';
import styles from './Player.module.scss';
import { useEffect, useRef, useState } from 'react';

export default function Player({ width = 320, audio }) {
  function getTime() {
    const a1 = Math.floor(progress / 60),
      a2 = Math.floor(progress % 60),
      b1 = Math.floor(duration / 60),
      b2 = Math.floor(duration % 60);
    return `${a1}:${a2 > 9 ? a2 : `0${a2}`} / ${b1}:${b2 > 9 ? b2 : `0${b2}`}`;
  }
  const audioRef = useRef(null),
    [playing, setPlaying] = useState(false),
    [progress, setProgress] = useState(0),
    [duration, setDuration] = useState(0),
    [mouseDown, setMouseDown] = useState(false);
  function updateProgress(e, press = false) {
    audioRef.current.currentTime =
      ((e.clientX - e.target.getBoundingClientRect().left) /
        e.target.getBoundingClientRect().width) *
      duration;
    press && setMouseDown(true);
  }
  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);
  useEffect(() => {
    if (progress === duration) {
      audioRef.current.currentTime = 0;
      setPlaying(false);
    }
  }, [progress]);
  return (
    <div className={styles.player} style={{ width: `${width}px` }}>
      <audio
        src={audio}
        ref={audioRef}
        preload='auto'
        onTimeUpdate={() => setProgress(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
      />
      <IconButton
        style='tonal'
        icon={playing ? 'pause' : 'play_arrow'}
        border_radius={playing ? '1rem' : '100rem'}
        onClick={() => setPlaying(!playing)}
      />
      <div
        className={styles.track_container}
        onMouseDown={(e) => updateProgress(e, true)}
        onMouseMove={(e) => mouseDown && updateProgress(e)}
        onMouseLeave={() => setMouseDown(false)}
        onMouseUp={() => setMouseDown(false)}
        onTouchStart={(e) => updateProgress(e, true)}
        onTouchMove={(e) => mouseDown && updateProgress(e)}
        onTouchCancel={() => setMouseDown(false)}
        onTouchEnd={() => setMouseDown(false)}
      >
        <div className={styles.user_interaction} draggable='false'>
          <div
            className={styles.track}
            style={{ width: `${width - 60}px` }}
            draggable='false'
          >
            <div
              className={styles.track_start}
              style={{ width: `${(progress / duration) * 100}%` }}
            >
              <TrackWave />
            </div>
            <div className={styles.track_handle}></div>
            <div className={styles.track_end}></div>
          </div>
          <p className={styles.timer}>{getTime()}</p>
        </div>
      </div>
    </div>
  );
}
