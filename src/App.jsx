import { useEffect, useRef, useState } from 'react'
import './App.css'

const tracks = [
  {
    id: 1,
    title: 'Pantropiko',
    artist: 'BINI',
    genre: 'p-pop',
    energy: 82,
    mood: 'happy',
    popularity: 92,
    audio: '/music/BINI - Pantropiko (Lyrics).mp3',
  },
  {
    id: 2,
    title: 'Tadhana',
    artist: 'UP Dharma Down',
    genre: 'indie',
    energy: 34,
    mood: 'calm',
    popularity: 76,
    audio: '/music/TADHANA (Lyrics) - UP DHARMA DOWN [BDRcHEhDxFA].mp3',
  },
  {
    id: 3,
    title: 'Raining in Manila',
    artist: 'Lola Amour',
    genre: 'pop-rock',
    energy: 95,
    mood: 'motivated',
    popularity: 88,
    audio: '/music/Lola Amour - Raining in Manila (Official Lyric Video).mp3',
  },
  {
    id: 4,
    title: 'Mundo',
    artist: 'IV of Spades',
    genre: 'indie',
    energy: 58,
    mood: 'happy',
    popularity: 63,
    audio: '/music/IV Of Spades - Mundo.mp3',
  },
  {
    id: 5,
    title: 'Buwan',
    artist: 'juan karlos',
    genre: 'opm-rock',
    energy: 69,
    mood: 'motivated',
    popularity: 85,
    audio: '/music/juan karlos - Buwan (Lyrics Letra).mp3',
  },
  {
    id: 6,
    title: 'The Day You Said Goodnight',
    artist: 'Hale',
    genre: 'acoustic',
    energy: 24,
    mood: 'calm',
    popularity: 54,
    audio: '/music/Hale - The Day You Said Goodnight (Official Music Video).mp3',
  },
]

function App() {
  const [favoriteGenre, setFavoriteGenre] = useState('p-pop')
  const [currentMood, setCurrentMood] = useState('happy')
  const [workoutMode, setWorkoutMode] = useState(false)
  const [currentTrackId, setCurrentTrackId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const personalizedTracks = tracks
      .map((track) => {
        let score = 0

        if (track.genre === favoriteGenre) {
          score += 30
        }

        // Rule 1: If user's current mood matches a track mood, boost that track.
        if (track.mood === currentMood) {
          score += 40
        }

        // Rule 2: If workout mode is enabled, prioritize high-energy tracks.
        if (workoutMode && track.energy >= 75) {
          score += 35
        }

        score += Math.round(track.popularity / 6)

        return { ...track, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)

  const topPick = personalizedTracks[0]

  const stopPlayback = () => {
    audioRef.current?.pause()
    if (audioRef.current) audioRef.current.currentTime = 0
    setIsPlaying(false)
  }

  const startPlayback = async (track) => {
    if (!audioRef.current) audioRef.current = new Audio()
    audioRef.current.src = track.audio
    audioRef.current.currentTime = 0
    audioRef.current.onended = () => {
      setIsPlaying(false)
      setCurrentTrackId(null)
    }
    await audioRef.current.play()
    setCurrentTrackId(track.id)
    setIsPlaying(true)
  }

  const togglePlayback = (track) => {
    if (currentTrackId === track.id && isPlaying) {
      stopPlayback()
      return
    }

    stopPlayback()
    startPlayback(track)
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="kicker">OPM Pulse / Adaptive Music</p>
        <h1>A better song for this exact moment</h1>
        <p className="intro">
          Set your mood and context. Your OPM queue reshapes itself around what you need right
          now.
        </p>
      </section>

      <section className="control-panel" aria-label="music personalization settings">
        <div className="control-group">
          <label htmlFor="genre">Favorite sound</label>
          <select
            id="genre"
            value={favoriteGenre}
            onChange={(event) => setFavoriteGenre(event.target.value)}
          >
            <option value="p-pop">P-pop</option>
            <option value="pop-rock">Pop-rock</option>
            <option value="indie">Indie OPM</option>
            <option value="opm-rock">OPM rock</option>
            <option value="acoustic">Acoustic</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="mood">Your mood right now</label>
          <select
            id="mood"
            value={currentMood}
            onChange={(event) => setCurrentMood(event.target.value)}
          >
            <option value="happy">Happy</option>
            <option value="calm">Calm</option>
            <option value="motivated">Motivated</option>
          </select>
        </div>

        <label className="toggle">
          <input
            type="checkbox"
            checked={workoutMode}
            onChange={(event) => setWorkoutMode(event.target.checked)}
          />
          <span>Workout mode</span>
        </label>
      </section>

      <section className="result-panel" aria-live="polite">
        <article className="top-pick">
          <p>Picked for you</p>
          <h2>{topPick.title}</h2>
          <p className="meta">
            {topPick.artist} • {topPick.genre.toUpperCase()} • Energy {topPick.energy}
          </p>
          <div className="chip-row">
            <span className="chip">Mood: {topPick.mood}</span>
            <span className="chip">Match score: {topPick.score}</span>
          </div>
          <button className="play-button featured-play" type="button" onClick={() => togglePlayback(topPick)}>
            <span aria-hidden="true">{currentTrackId === topPick.id && isPlaying ? '||' : '>'}</span>
            {currentTrackId === topPick.id && isPlaying ? ' Pause preview' : ' Play preview'}
          </button>
        </article>

        <div className="playlist-grid">
          {personalizedTracks.map((track, index) => (
            <article className="track-card" key={track.id}>
              <p className="rank">#{index + 1}</p>
              <h3>{track.title}</h3>
              <p className="meta">
                {track.artist} • {track.genre.toUpperCase()}
              </p>
              <p className="meta">Mood: {track.mood}</p>
              <p className="meta">Energy: {track.energy}</p>
              <p className="score">Score {track.score}</p>
              <button className="play-button" type="button" onClick={() => togglePlayback(track)}>
                <span aria-hidden="true">{currentTrackId === track.id && isPlaying ? '||' : '>'}</span>
                {currentTrackId === track.id && isPlaying ? ' Pause' : ' Play'}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="rules-panel">
        <h2>Galing ng playlist</h2>
        <p>Rule 1: If your mood matches the song's mood, then increase its recommendation score.</p>
        <p>Rule 2: If workout mode is on and energy is high, then prioritize the song.</p>
      </section>
    </main>
  )
}

export default App
