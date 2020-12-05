const express = require('express');
const { db } = require('../config/database');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { movieId } = req.params;
  try {
    const showtimeRef = db
      .collection('movies')
      .doc(movieId)
      .collection('showtimes');
    const snapshot = await showtimeRef.get();
    const allShowtimes = snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json(allShowtimes);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:showtimeId', async (req, res) => {
  const { movieId, showtimeId } = req.params;
  try {
    const showtimeRef = db
      .collection('movies')
      .doc(movieId)
      .collection('showtimes')
      .doc(showtimeId);
    const doc = await showtimeRef.get();
    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: 'Showtime with this ID does not exist' });
    }
    return res.status(200).json(doc.data());
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { movieId } = req.params;
  try {
    const movieRef = db.collection('movies').doc(movieId);
    const doc = await movieRef.get();

    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: 'Movie with this ID does not exist' });
    }
    // eslint-disable-next-line object-curly-newline
    const { startAt, endAt, hallName, unavailableSeats, city } = req.body;

    const showtime = await movieRef.collection('showtimes').doc();
    showtime.set({
      startAt,
      endAt,
      hallName,
      unavailableSeats,
      city,
      movie: movieId,
    });
    return res.status(200).json({
      success: true,
      _id: showtime.id,
      movie_id: movieId,
      ...req.body,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/:showtimeId', async (req, res) => {
  const { movieId, showtimeId } = req.params;
  try {
    const showtimeRef = db
      .collection('movies')
      .doc(movieId)
      .collection('showtimes')
      .doc(showtimeId);
    const doc = await showtimeRef.get();
    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: 'Showtime with this ID does not exist' });
    }
    await showtimeRef.update(req.body);
    return res.status(200).json({
      success: true,
      showtime_id: showtimeRef.id,
      ...req.body,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/:showtimeId', async (req, res) => {
  const { movieId, showtimeId } = req.params;
  try {
    const showtimeRef = db
      .collection('movies')
      .doc(movieId)
      .collection('showtimes')
      .doc(showtimeId);
    const doc = await showtimeRef.get();
    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: 'Showtime with this ID does not exist' });
    }
    await showtimeRef.delete();
    return res.status(200).json({
      success: true,
      showtime_id: showtimeRef.id,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
