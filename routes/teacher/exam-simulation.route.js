const express = require('express');
const router = express.Router();

const allQuestions = require('./exam-simulation.mock.json');

router.get('/:examId', (req, res) => {
  const examId = req.params.examId; // aunque no lo uses, lo simulamos
  const page = parseInt(req.query.page, 10) || 1;
  const perPage = 1;

  const total = allQuestions.data.length;
  const totalPages = total;
  const questionIndex = page - 1;

  if (page > total || page < 1) {
    return res.status(404).json({
      success: false,
      message: `Página no encontrada. El examen ${examId} tiene ${total} preguntas.`,
      data: null
    });
  }

  const currentQuestion = allQuestions.data[questionIndex];
  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}/${examId}`;

  res.json({
    success: true,
    data: [currentQuestion],
    meta: {
      currentPage: page,
      perPage: 1,
      total,
      totalPages,
      questionNumber: page,
      isFirstQuestion: page === 1,
      isLastQuestion: page === total
    },
    links: {
      first: `${baseUrl}?page=1`,
      last: `${baseUrl}?page=${totalPages}`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null
    },
    message: `Pregunta ${page} de ${total} del examen ${examId}.`
  });
});


module.exports = router;
