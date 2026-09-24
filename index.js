const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Habilitar CORS para permitir peticiones desde tu frontend
app.use(cors({
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Endpoint que llamará tu app.js
app.post('/api/consulta', async (req, res) => {
    try {
        const { tipoDocumento, numeroDocumento, fechaNacimiento } = req.body;

        // Petición real al servidor del ICFES desde el backend
        const responseICFES = await axios.post('https://resultadosbackend.icfes.gov.co/api/tu-ruta-del-icfes', {
            tipoDocumento,
            numeroDocumento,
            fechaNacimiento
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return res.status(200).json(responseICFES.data);

    } catch (error) {
        console.error("Error al consultar el ICFES:", error.response?.data || error.message);
        return res.status(500).json({ 
            error: "No se pudo completar la consulta con el servidor del ICFES." 
        });
    }
});

module.exports = app;
