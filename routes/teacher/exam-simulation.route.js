const express = require('express');
const router = express.Router();

const allQuestions = require('./exam-simulation.mock.json');

router.get('/', (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const perPage = 1; // SIEMPRE 1 pregunta por página para exámenes

  const total = allQuestions.data.length;
  const totalPages = total; // Total de páginas = total de preguntas
  const questionIndex = page - 1; // Índice de la pregunta actual

  // Verificar que la página solicitada existe
  if (page > total || page < 1) {
    return res.status(404).json({
      success: false,
      message: 'Página no encontrada. El examen tiene ' + total + ' preguntas.',
      data: null
    });
  }

  // Obtener solo UNA pregunta para la página actual
  const currentQuestion = allQuestions.data[questionIndex];
  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

  res.json({
    success: true,
    data: [currentQuestion], // Array con una sola pregunta
    meta: {
      currentPage: page,
      perPage: 1,
      total,
      totalPages,
      questionNumber: page, // Número de pregunta actual
      isFirstQuestion: page === 1,
      isLastQuestion: page === total
    },
    links: {
      first: `${baseUrl}?page=1`,
      last: `${baseUrl}?page=${totalPages}`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null
    },
    message: `Pregunta ${page} de ${total}.`
  });
});

module.exports = router;
