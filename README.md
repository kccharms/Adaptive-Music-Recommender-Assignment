# Adaptive Music Recommender (React + Vite)

This app is a small OPM hit personalization demo built with React and Vite. It recommends
familiar Filipino songs from artists such as BINI, Lola Amour, IV of Spades, and Hale.

The Play buttons use the MP3 files stored in `public/music`, so the browser plays the actual
downloaded tracks locally.

## Required Logic Format

Rule 1: If current mood equals an OPM track mood -> Then increase that track's recommendation score.

Rule 2: If workout mode is enabled and an OPM track's energy is high (>= 75) -> Then prioritize that track by adding extra score.

## Explanation

The app adapts OPM recommendations in real time using mood and activity context.
When mood and track mood align, listeners get Filipino songs that feel emotionally relevant in that moment.
When workout mode is on, the app pushes energetic OPM songs up the list for better momentum and engagement.
Together, these rules make the playlist feel more personal, useful, and human than static popularity-only ranking.

## Run

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```
