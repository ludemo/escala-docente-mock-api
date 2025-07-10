const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Importar rutas
const teacherRoutes = require('./routes/teacher/teacher.route');
app.use('/api/teachers', teacherRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Mock API listening at http://localhost:${port}`);
});
