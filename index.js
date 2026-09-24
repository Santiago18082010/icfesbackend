const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['POST', 'OPTIONS', 'GET'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Base de datos de estudiantes (Reemplaza o ajusta estos datos con los reales que necesitas mostrar)
const baseDeDatosEstudiantes = [
    {
        tipoDocumento: "TI",
        numeroDocumento: "1023456789",
        fechaNacimiento: "2008-05-12",
        nombres: "JUAN ESTEBAN PÉREZ GÓMEZ",
        puntajeGlobal: "385",
        percentilGlobal: "90",
        ACREGISTRO: "AC20261234567",
        examenNombre: "SABER 11",
        periodo: "2026-1",
        puntajeMaterias: [
            { nombrePrueba: "Lectura Crítica", puntaje: "78", nivel: "4", percentil: "85" },
            { nombrePrueba: "Matemáticas", puntaje: "82", nivel: "4", percentil: "92" },
            { nombrePrueba: "Sociales y Ciudadanas", puntaje: "75", nivel: "3", percentil: "80" },
            { nombrePrueba: "Ciencias Naturales", puntaje: "75", nivel: "3", percentil: "82" },
            { nombrePrueba: "Inglés", puntaje: "75", nivel: "B2", percentil: "88" }
        ]
    }
    // Agrega más objetos aquí con la información real de los estudiantes
];

// Ruta GET de verificación
app.get('/api/consulta', (req, res) => {
    res.json({ 
        status: "Activo", 
        message: "El endpoint de consulta está listo en index.js." 
    });
});

// Ruta POST principal para búsqueda real
app.post('/api/consulta', async (req, res) => {
    const { tipoDocumento, numeroDocumento, fechaNacimiento } = req.body || {};

    console.log(`\n--- Búsqueda de Resultados ---`);
    console.log(`Buscando -> Tipo: ${tipoDocumento} | Doc: ${numeroDocumento} | Nacimiento: ${fechaNacimiento}`);

    if (!tipoDocumento || !numeroDocumento) {
        return res.status(400).json({ 
            error: "Faltan datos obligatorios para realizar la búsqueda." 
        });
    }

    try {
        // Buscar al estudiante por número de documento y tipo
        const estudianteEncontrado = baseDeDatosEstudiantes.find(item => 
            item.numeroDocumento === numeroDocumento.trim() && 
            item.tipoDocumento === tipoDocumento
        );

        if (!estudianteEncontrado) {
            return res.status(404).json({ 
                exito: false,
                error: "No se encontraron resultados para el documento ingresado. Verifique los datos." 
            });
        }

        // Retornar los datos reales encontrados
        return res.status(200).json({
            exito: true,
            ...estudianteEncontrado
        });

    } catch (error) {
        console.error("❌ Error interno en el servidor:", error);
        return res.status(500).json({ 
            error: "Ocurrió un error al procesar la consulta en el servidor.",
            detalles: error.message 
        });
    }
});

// Exportar app para Vercel
module.exports = app;

// Iniciar servidor localmente si se ejecuta de forma independiente
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}
