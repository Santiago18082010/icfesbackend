const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/consulta', (req, res) => {
    return res.json({ status: "Activo", message: "Servidor funcionando correctamente." });
});

app.post('/api/consulta', (req, res) => {
    try {
        const { tipoDocumento, numeroDocumento, fechaNacimiento } = req.body || {};

        if (!tipoDocumento || !numeroDocumento) {
            return res.status(400).json({ error: "Faltan datos obligatorios." });
        }

        return res.json({
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
    } catch (err) {
        return res.status(500).json({ error: "Error interno en el servidor." });
    }
});

module.exports = app;
