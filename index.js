const express = require('express');
const cors = require('cors');

const app = express();

// Middleware de CORS y JSON
app.use(cors({
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Ruta de verificación GET
app.get('/api/consulta', (req, res) => {
    return res.status(200).json({ 
        status: "Activo", 
        message: "El servidor está listo para recibir consultas." 
    });
});

// Ruta POST principal que recibe los datos de tu frontend
app.post('/api/consulta', async (req, res) => {
    try {
        const { tipoDocumento, numeroDocumento, fechaNacimiento } = req.body;

        console.log(`Consulta recibida -> Tipo: ${tipoDocumento}, Documento: ${numeroDocumento}, Fecha: ${fechaNacimiento}`);

        if (!tipoDocumento || !numeroDocumento) {
            return res.status(400).json({ 
                error: "Faltan datos obligatorios para realizar la consulta." 
            });
        }

        // Respuesta simulada estructurada exactamente como la espera tu index.html
        return res.status(200).json({
            exito: true,
            nombres: "ESTUDIANTE EJEMPLO ICFES",
            examenes: [
                {
                    examenNombre: "SABER 11",
                    periodo: "2026-1",
                    puntaje: "365",
                    percentilGlobal: "85",
                    ACREGISTRO: "AC20261234567",
                    puntajeMaterias: [
                        { nombrePrueba: "Lectura Crítica", nivel: "4", percentil: "80", puntaje: "70" },
                        { nombrePrueba: "Matemáticas", nivel: "4", percentil: "90", puntaje: "75" },
                        { nombrePrueba: "Sociales y Ciudadanas", nivel: "3", percentil: "75", puntaje: "68" },
                        { nombrePrueba: "Ciencias Naturales", nivel: "4", percentil: "82", puntaje: "72" },
                        { nombrePrueba: "Inglés", nivel: "B2", percentil: "95", puntaje: "80" }
                    ]
                }
            ]
        });

    } catch (error) {
        console.error("Error interno en el servidor:", error);
        return res.status(500).json({ 
            error: "Ocurrió un error interno al procesar la solicitud en el servidor." 
        });
    }
});

module.exports = app;
