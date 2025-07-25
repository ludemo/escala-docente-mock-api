const express = require('express');
const router = express.Router();
const teachers = require('./teachers.json'); // Ajusta la ruta si es necesario
const examSimulationRoutes = require('./exam-simulation.route');
router.use('/exam-simulation', examSimulationRoutes);

router.get('/', (req, res) => {
  // Parámetros de paginación desde la URL
  const page = parseInt(req.query.page, 10) || 1;
  const perPage = parseInt(req.query.limit, 10) || 10;

  const total = teachers.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const paginatedTeachers = teachers.slice(startIndex, endIndex);

  // Construir URLs para links
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const baseRoute = fullUrl.split('?')[0];
  const makeLink = p => `${baseRoute}?page=${p}&limit=${perPage}`;

  const links = {
    first: makeLink(1),
    last: makeLink(totalPages),
    prev: page > 1 ? makeLink(page - 1) : null,
    next: page < totalPages ? makeLink(page + 1) : null
  };

  // Resumen general
  const activeTotal = teachers.filter(t => t.status === "active").length;
  const expiredTotal = teachers.filter(t => t.status === "expired").length;

  res.json({
    success: true,
    data: {
      summary: {
        total_teachers: total,
        active_total: activeTotal,
        expiring_soon_total: 0,  // Puedes mejorar este cálculo si quieres
        expired_total: expiredTotal
      },
      teachers: paginatedTeachers
    },
    meta: {
      current_page: page,
      per_page: perPage,
      total,
      total_pages: totalPages
    },
    links,
    message: "Teachers list."
  });
});

module.exports = router;
