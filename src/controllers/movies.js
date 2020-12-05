/* eslint-disable camelcase */
const express = require('express');
const { db } = require('../config/database');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const moviesRef = db.collection('movies');
    const snapshot = await moviesRef.get();
    const allMovies = snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json(allMovies);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const movieRef = await db.collection('movies').doc(movieId);
    const doc = await movieRef.get();
    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: 'Movie with this ID does not exist' });
    }
    const data = doc.data();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      title,
      overview,
      popularity,
      poster_path,
      backdrop_path,
      runtime,
      genres,
      release_date,
      tmdb_id,
      status,
    } = req.body;
    const movieRef = db.collection('movies').doc();
    await movieRef.set({
      title,
      overview,
      popularity,
      poster_path,
      backdrop_path,
      runtime,
      genres,
      release_date,
      tmdb_id,
      status,
    });
    return res.status(200).json({
      success: true,
      _id: movieRef.id,
      ...req.body,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const movieRef = db.collection('movies').doc(movieId);
    const doc = await movieRef.get();

    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: 'Movie with this ID does not exist' });
    }
    await movieRef.update(req.body);
    return res.status(200).json({
      success: true,
      _id: movieRef.id,
      ...req.body,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const movieRef = db.collection('movies').doc(movieId);
    const doc = await movieRef.get();
    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: 'Movie with this ID does not exist' });
    }
    await movieRef.delete();
    return res.status(204).json({ success: true, _id: movieRef.id });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
