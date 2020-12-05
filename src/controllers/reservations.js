const express = require('express');
const { db } = require('../config/database');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { movieId, showtimeId } = req.params;
  try {
    const reservationRef = db
      .collection('movies')
      .doc(movieId)
      .collection('showtimes')
      .doc(showtimeId)
      .collection('reservations');
    const snapshot = await reservationRef.get();
    const allReservations = snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json(allReservations);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:reservationId', async (req, res) => {
  const { movieId, showtimeId, reservationId } = req.params;
  try {
    const reservationRef = db
      .collection('movies')
      .doc(movieId)
      .collection('showtimes')
      .doc(showtimeId)
      .collection('reservations')
      .doc(reservationId);
    const doc = await reservationRef.get();
    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: 'Reservation with this ID does not exist' });
    }
    return res.status(200).json(doc.data());
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', async (req, res) => {
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
    const { username, email, isPaymentSucceed, seats, totalPrice } = req.body;

    const reservation = await showtimeRef.collection('reservations').doc();
    reservation.set({
      username,
      email,
      isPaymentSucceed,
      seats,
      totalPrice,
      showtime: showtimeId,
    });
    return res.status(200).json({
      success: true,
      reservation_id: reservation.id,
      showtime_id: showtimeId,
      movie_id: movieId,
      ...req.body,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/:reservationId', async (req, res) => {
  const { movieId, showtimeId, reservationId } = req.params;
  try {
    const reservationRef = db
      .collection('movies')
      .doc(movieId)
      .collection('showtimes')
      .doc(showtimeId)
      .collection('reservations')
      .doc(reservationId);
    const doc = await reservationRef.get();
    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: 'Reservation with this ID does not exist' });
    }
    await reservationRef.update(req.body);
    return res.status(200).json({
      success: true,
      reservation_id: reservationId,
      showtime_id: showtimeId,
      movie_id: movieId,
      ...req.body,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/:reservationId', async (req, res) => {
  const { movieId, showtimeId, reservationId } = req.params;
  try {
    const reservationRef = db
      .collection('movies')
      .doc(movieId)
      .collection('showtimes')
      .doc(showtimeId)
      .collection('reservations')
      .doc(reservationId);
    const doc = await reservationRef.get();
    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: 'Reservation with this ID does not exist' });
    }
    await reservationRef.delete();
    return res.status(200).json({
      success: true,
      reservation_id: reservationRef.id,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
